// src/weather/schemas/weather.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type WeatherDataDocument = WeatherData & Document;

@Schema()
export class WeatherData {
  @Prop({ required: true })
  city: string;

  @Prop({ required: true })
  temperature: number;

  @Prop({ required: true })
  feelsLike: number;

  @Prop({ required: true })
  weatherCondition: string;

  @Prop({ required: true })
  humidity: number;  // New field for humidity

  @Prop({ required: true })
  windSpeed: number;  // New field for wind speed

  @Prop({ required: true })
  timestamp: Date;
}

export const WeatherDataSchema = SchemaFactory.createForClass(WeatherData);
