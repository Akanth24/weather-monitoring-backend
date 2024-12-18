// src/weather/schemas/threshold.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ThresholdDocument = Threshold & Document;

@Schema({ timestamps: true })  // Add timestamps option here
export class Threshold {
  @Prop({ required: true })
  city: string;

  @Prop({ required: true })
  temperatureThreshold: number;

  @Prop({ required: false })
  weatherCondition?: string;  // Optional condition like 'Rain', 'Clear', etc.

  @Prop({ default: false })
  alertTriggered: boolean;

  @Prop({ default: 0 })
  breachCount: number;  // Count consecutive breaches

  @Prop({ required: true })
  email: string;  // Email address to send alert

  // Unique compound index for city, temperatureThreshold, and email
  static get schemaOptions() {
    return { 
      indexes: [{ fields: { city: 1, temperatureThreshold: 1, email: 1 }, options: { unique: true } }]
    };
  }
}

export const ThresholdSchema = SchemaFactory.createForClass(Threshold);

// Add unique index for city, temperatureThreshold, and email
ThresholdSchema.index({ city: 1, temperatureThreshold: 1, email: 1 }, { unique: true });
