import { Body, Controller, Post } from '@nestjs/common';
import { SmsbuzzService } from './smsbuzz.service';
import { ApiTags } from '@nestjs/swagger';
import { SendSmsDTO, SendVoiceDTO } from './dto/send-sms.dto';

@Controller('smsbuzz')
@ApiTags('smsbuzz')
export class SmsbuzzController {
  constructor(private readonly smsbuzzService: SmsbuzzService) {}

  @Post('sendsms')
  sendSms(@Body() sendSms: SendSmsDTO) {
    return this.smsbuzzService.sendSms(sendSms);
  }

  @Post('sendvoice')
  sendVoice(@Body() sendVoice: SendVoiceDTO) {
    return this.smsbuzzService.sendVoice(sendVoice);
  }
}
