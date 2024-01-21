import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  apiKey = 'qY1toeVWc8cbDdDNCXYowlg4DxuGkXz1zJ3y2a3he31a7ae2';
  chatHistory = [

  ];
  userMessage = '';
  loading = false;

  async sendMessage(message: string) {
    console.log("message", message);

    this.chatHistory.push({ role: 'user', content: message });
    this.showLoading();

    try {
      const botResponse = await this.getBotResponse(message);

      this.hideLoading();

      this.chatHistory.push({ role: 'assistant', content: botResponse });
    } catch (error) {
      console.error('Error:', error);
      this.hideLoading();
    }

    // this.userMessage = '';
  }

  showLoading() {
    this.loading = true;
  }

  hideLoading() {
    this.loading = false;
  }

  async getBotResponse(userMessage: string) {
    const apiUrl = 'https://getcody.ai/api/v1/messages';

    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.apiKey}`
    };

    const requestData = {
      content: userMessage,
      conversation_id : "mxkaz4vk7dJ0"
    };

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(requestData)
    });

    const data = await response.json();

    console.log("data", data);
    const botResponse = data.data.content;
    return botResponse;
  }


}
