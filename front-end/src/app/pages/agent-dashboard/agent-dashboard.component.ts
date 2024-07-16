import { Component, OnInit, ElementRef, ViewChild, AfterViewChecked } from '@angular/core';
import { DatePipe } from '@angular/common';
import { NgForm } from '@angular/forms';
import { ResponseItem, TableItem } from '@app/models/table-item';
import { AiAssistantService } from '@app/services/ai-assistant/ai-assistant.service';
import { ResponseProcessingService } from '@app/services/response-processing/response-processing.service';



@Component({
  selector: 'app-agent-dashboard',
  templateUrl: './agent-dashboard.component.html',
  styleUrls: ['./agent-dashboard.component.scss']
})
export class AgentDashboardComponent implements OnInit, AfterViewChecked {
  @ViewChild('chatBody') chatBody?: ElementRef;
  @ViewChild('chatPromptField') chatPromptField?: ElementRef;
  responseItems: any[] = [];
  tableItems: TableItem[] = [];
  currentUserName: string = 'Linda';
  progressBarStatus: any = 'finished';

  constructor(
    private datePipe: DatePipe, 
    private aiAisstantService: AiAssistantService,
    private responseProcessingService: ResponseProcessingService
  ){}

  ngOnInit(): void {
    setTimeout(() => {
      this.addResponseItem('response', 'text', `Hello! How can I help you today?`);
    }, 800);
  }

  ngAfterViewChecked(): void {
    this.scrollToCurrentMessage();
  }

  // Chat layout functions
  textareaContent: string = '';

  adjustTextareaHeight() {
    const textarea = this.chatPromptField?.nativeElement;
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
  }

  scrollToCurrentMessage(): void {
    if (this.chatBody) {
      try {
        const scrollableElement = this.chatBody.nativeElement;
        scrollableElement.scrollTo({
          top: scrollableElement.scrollHeight,
          behavior: 'smooth'
        });
      } catch (err) {
        console.error('Error scrolling to bottom:', err);
      }
    }
  }

  // Utility functions
  addResponseItem(responseType: string, sectionType: string, sectionData: string) {
    const newResponseItem: ResponseItem = {
      type: responseType,
      sections: [
        {
          type: sectionType,
          data: sectionData
        }
      ]
    }
    this.responseItems?.push(newResponseItem);
  }

  getCurrentTime() {
    const currentDate = new Date();
    const currentTime = this.datePipe.transform(currentDate, 'shortTime') || 'N/A';
    return currentTime;
  }

  isPrompt(responseItem: any): boolean {
    return responseItem.type == 'prompt';
  }

  isAgent(responseItem: any): boolean {
    return responseItem.type == 'agent';
  }
  
  flattenArray(mdArray: []) {
    return mdArray.reduce((a:any, b:any) => {
      return a.concat(b);
    }, []);
  }

  isFraudulent(section: any): boolean {
    // First check if the section is of type 'table'
    if (section.type === 'table' && Array.isArray(section.data)) {
      // Then check if any data item within the table has a 'fraud_score'
      return section.data.some((item: TableItem) => item.fraud_score !== undefined);
    }
    return false;
  }
    
  // Chat form functions
  onEnter(event: Event, form: NgForm): void {
    event.preventDefault();
    const formElement = form ? form.form : null;
    
    if (formElement && form.value.prompt && this.progressBarStatus !== 'active') {
      this.sendPrompt(form);
    }
  }

  sendPrompt(form: NgForm): void {
    let chatResponse: ResponseItem;
    this.addResponseItem('prompt', 'text', form.value.prompt);
    this.progressBarStatus = 'active';
    
    // Call API
    this.aiAisstantService.getAgentResponse(form.value.prompt).subscribe(
      (response: ResponseItem) => {
        this.progressBarStatus = 'finished';
        chatResponse = this.responseProcessingService.formatResponse(response);
        chatResponse.sections.forEach((section, i=0) => {
          if (section.type == 'table') {
            if (Array.isArray(section.data)) {
              section.data = this.flattenArray(section.data as any);
            }
          }
        });
        this.responseItems?.push(chatResponse);
      },
      (error:any) => {
        this.progressBarStatus = 'error';
        this.addResponseItem('agent', 'text', 'Oops! We hit a snag. Could you try running your prompt again? Sometimes all it takes is a little nudge. If it still doesn’t work, I’m here to dive deeper and help out!');
        console.error('Error calling AI Assistant: ', error)
      }
    );

    // this.sendChatResponse(); // temp for testing?

    const textarea = this.chatPromptField?.nativeElement;
    if (textarea) textarea.style.height = '';
    form.reset();
  }

  // Temp for testing
  sendChatResponse() {
    const mockTableData: any[] = [
        [
            {
                "acc_id": 20054266,
                "balance": 20390,
                "country": "United States",
                "dob": "2058-06-08T00:00:00",
                "email": "sierra.hayes123@astralventures.io",
                "first_name": "Sierra",
                "fraud_category": 3,
                "fraud_score": 1,
                "from_acc_id": 20054266,
                "gender_id": 2,
                "last_name": "Hayes",
                "pincode": "55415",
                "state": "MN",
                "to_acc_id": 20054219,
                "tran_date": "2024-04-17T00:00:00",
                "transaction_amount": 23000,
                "transaction_id": 110424003,
                "user_id": 76
            }
        ],
        [
            {
                "acc_id": 20054284,
                "balance": 50488,
                "country": "United States",
                "dob": "1966-10-16T00:00:00",
                "email": "luz.hernandez123@astralnexus.biz",
                "first_name": "Luz",
                "fraud_category": 2,
                "fraud_score": 1,
                "from_acc_id": 20054284,
                "gender_id": 2,
                "last_name": "Hernandez",
                "pincode": "55416",
                "state": "MN",
                "to_acc_id": 20054258,
                "tran_date": "2024-04-15T00:00:00",
                "transaction_amount": 10000,
                "transaction_id": 110424002,
                "user_id": 94
            }
        ]
    ];

    setTimeout(() => {
      const newResponseItem: ResponseItem = {
        "type": 'agent',    
            "sections": [
              {
                "type": "text",
                "data": "Certainly, here is a list of the top 2 customers that meet your criteria."
              }, 
              {
                "type": "table",
                "data": mockTableData
              }
            ]
          }
          let chatResponse = this.responseProcessingService.formatResponse(newResponseItem);
          chatResponse.sections.forEach((section, i=0) => {
            if (section.type == 'table') {
              if (Array.isArray(section.data)) {
                section.data = this.flattenArray(section.data as any);
              }
            }
          });
          console.log(chatResponse);
          this.responseItems?.push(chatResponse);
    }, 3000);
  }
}
