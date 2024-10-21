import { Controller, Get, Query, Param, BadRequestException, Post, Body, Patch, Delete } from '@nestjs/common';
import { WeatherService } from './weather.service';

@Controller('weather')
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}
  
  @Get('city/:city')
  async getOpenWeatherData(@Param('city') city: string) {
    if (!city) {
      throw new BadRequestException('City name is required');
    }
    return this.weatherService.getOpenWeatherData(city);
  }

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
    @Body('weatherCondition') weatherCondition?: string,  // Optional
  ) {
    return this.weatherService.createThreshold(city, temperatureThreshold, email, weatherCondition);
  }

   // GET endpoint to fetch all thresholds
   @Get('thresholds')
   async getAllThresholds() {
     return await this.weatherService.getAllThresholds();
   }
 
   // PATCH endpoint to update a threshold by ID
   @Patch('threshold/:id')
   async updateThreshold(
     @Param('id') id: string,
     @Body('city') city: string,
     @Body('temperatureThreshold') temperatureThreshold: number,
     @Body('email') email: string,
     @Body('weatherCondition') weatherCondition?: string, // Optional
   ) {
     return await this.weatherService.updateThreshold(id, city, temperatureThreshold, email, weatherCondition);
   }
 
   // DELETE endpoint to remove a threshold by ID
   @Delete('threshold/:id')
   async deleteThreshold(@Param('id') id: string) {
     return await this.weatherService.deleteThreshold(id);
   }

  @Get('send-mail')
  async sendMail(
    @Query('mailTo') mailTo: string,@Body('sub') sub: string ,@Body('msg') msg: string
  ) {
    return this.weatherService.sendMailTest(mailTo,sub,msg);
  }
  
}
