import {
  Controller,
  Post,
  Get,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateOrganizationDto } from '../dto/create-organization.dto';
import { CreateOrganizationCommand } from '../command/create-organization.command';
import { GetOrganizationsQuery } from '../query/get-organizations.query';
import { DeleteOrganizationCommand } from '../command/delete-organization.command';
import { JwtUserGuard, CurrentUser } from '@vendi/core';

@Controller('organizations')
export class OrganizationRequestHandler {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  @UseGuards(JwtUserGuard)
  async createOrganization(
    @Body() dto: CreateOrganizationDto,
    @CurrentUser() userId: string,
  ) {
    return await this.commandBus.execute(
      new CreateOrganizationCommand(dto, userId),
    );
  }

  @Get()
  @UseGuards(JwtUserGuard)
  async getOrganizations(@CurrentUser() userId: string) {
    return await this.queryBus.execute(new GetOrganizationsQuery(userId));
  }

  @Delete(':id')
  @UseGuards(JwtUserGuard)
  async deleteOrganization(
    @Param('id') organizationId: string,
    @CurrentUser() userId: string,
  ) {
    await this.commandBus.execute(
      new DeleteOrganizationCommand(organizationId, userId),
    );
  }
}
