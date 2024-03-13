import { BadRequestException, Injectable } from '@nestjs/common';
import { SendSmsDTO, SendVoiceDTO } from './dto/send-sms.dto';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class SmsbuzzService {
  private loginSmsBuzz: string;
  private passSmsBuzz: string;
  private apiUrlSmsBuzz: string;
  constructor(configService: ConfigService) {
    this.apiUrlSmsBuzz = configService.get('API_URL_SMSBUZZ');
    this.loginSmsBuzz = configService.get('LOGIN_SMSBUZZ');
    this.passSmsBuzz = configService.get('PASS_SMSBUZZ');
  }

  async login() {
    try {
      const response = await axios.post(
        this.apiUrlSmsBuzz + '/api/accesstoken',
        {
          username: this.loginSmsBuzz,
          password: this.passSmsBuzz,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      return response.data;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async sendSms(sendSms: SendSmsDTO) {
    console.log('send SMS', sendSms);
    
    const {SenderName, Destinations, Text, IsUnicode } = sendSms;
    const cleanDestinations = Destinations.replace('+', '').replace(/\s/g, '')
    
    const { AccessToken } = await this.login();

    if (!AccessToken) {
      throw new BadRequestException('Erro ao realizar login');
    }

    try {
      const response = await axios.post(
        this.apiUrlSmsBuzz + '/sms/send',
        {
            "Destinations": [
                cleanDestinations
            ],
            SenderName,
            Text,
            IsUnicode
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${AccessToken}`,
          },
        },
      );

      return response.data;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async sendVoice(sendVoice: SendVoiceDTO) {
    console.log('send Voice', sendVoice);
    const { AccessToken } = await this.login();

    const { Destinations, Language, TTSVoice, Text } = sendVoice;
    const cleanDestinations = Destinations.replace('+', '').replace(/\s/g, '')

    if (!AccessToken) {
      throw new BadRequestException('Erro ao realizar login');
    }

    try {
      const response = await axios.post(
        this.apiUrlSmsBuzz + '/call/send',
        {
          "Destinations": [
              cleanDestinations
          ],
          Text,
          Language,
          TTSVoice
      },
        {
          headers: {
            Authorization: `Bearer ${AccessToken}`,
          },
        },
      );

      return response.data;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
