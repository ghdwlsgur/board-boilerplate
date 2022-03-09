import {
  Body,
  Controller,
  Get,
  Logger,
  Param,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/user/get-user.decorator';
import { User } from 'src/user/user.entity';
import { Board } from './board.entity';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';

@Controller('boards')
@UseGuards(AuthGuard())
export class BoardsController {
  private logger = new Logger('BoardsController');
  constructor(private boardsService: BoardsService) {}

  @Post()
  @UsePipes(ValidationPipe)
  createBoard(
    @Body() createBoardDto: CreateBoardDto,
    @GetUser() user: User,
  ): Promise<Board> {
    this.logger.verbose(`User ${user.username} creating a new board. 
    Payload: ${JSON.stringify(createBoardDto)}`);
    return this.boardsService.createBoard(createBoardDto, user);
  }

  @Get('/:id')
  getBoardById(@Param('id') id: number): Promise<Board> {
    return this.boardsService.getBoardById(id);
  }
}
