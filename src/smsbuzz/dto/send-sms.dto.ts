import { IsNotEmpty, IsOptional } from 'class-validator';

export class SendSmsDTO {
  @IsNotEmpty({ message: 'SenderName não deve estar vazio' })
  SenderName: string;

  @IsNotEmpty({ message: 'Destinations não deve estar vazio' })
  Destinations: string

  @IsNotEmpty({ message: 'Text não deve estar vazio' })
  Text: string;

  @IsOptional()
  @IsNotEmpty({ message: 'Text não deve estar vazio' })
  Campaign: string;

  @IsOptional()
  @IsNotEmpty({ message: 'Sobrenome não deve estar vazio' })
  IsUnicode: boolean;
}

export class SendVoiceDTO {
  @IsNotEmpty({ message: 'Destinations não deve estar vazio' })
  Destinations: string

  @IsNotEmpty({ message: 'Text não deve estar vazio' })
  Text: string;

  @IsNotEmpty({ message: 'Language não deve estar vazio' })
  Language: string;

  @IsNotEmpty({ message: 'TTSVoice não deve estar vazio' })
  TTSVoice: string;
}
