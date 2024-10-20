import { Controller, Get, Query, Param, BadRequestException, Post, Body } from '@nestjs/common';
import { WeatherService } from './weather.service';

@Controller('weather')
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  // GET latest weather data for a specific city
  @Get('latest')
  async getLatestWeatherData(@Query('city') city: string) {
    if (!city) {
      throw new BadRequestException('City name is required');
    }
    return this.weatherService.getLatestWeatherData(city);
  }

  // GET daily weather summary for a specific city
  @Get('daily-summary')
  async getDailySummary(@Query('city') city: string) {
    if (!city) {
      throw new BadRequestException('City name is required');
    }
    return this.weatherService.getDailySummary(city);
  }

  // GET weather history for a specific city and number of days
  @Get('history')
  async getWeatherHistory(@Query('city') city: string, @Query('days') days: string) {
    if (!city || !days) {
      throw new BadRequestException('City name and number of days are required');
    }
    const daysInt = parseInt(days, 10);
    if (isNaN(daysInt) || daysInt <= 0) {
      throw new BadRequestException('Number of days must be a valid positive integer');
    }
    return this.weatherService.getWeatherHistory(city, daysInt);
  }

  // POST endpoint to create a threshold
  @Post('threshold')
  async createThreshold(
    @Body('city') city: string,
    @Body('temperatureThreshold') temperatureThreshold: number,
    @Body('email') email: string,
    @Body('weatherCondition') weatherCondition?: string, // Optional
  ) {
    // Call the service method to create the threshold
    const threshold = await this.weatherService.createThreshold(
      city,
      temperatureThreshold,
      email,
      weatherCondition,
    );
    return threshold;
  }

  @Get('send-mail')
  async sendMail(
    @Query('mailTo') mailTo: string, @Query('msg') msg: string
  ) {
    return this.weatherService.sendMailTest(mailTo,msg);
  }
  
}
