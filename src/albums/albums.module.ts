import { Module } from '@nestjs/common';
import { AlbumsResolver } from './albums.resolver';
import { AlbumsService } from './albums.service';
import { albumModelModule } from './albums.model';

@Module({
  imports:[albumModelModule],
  providers: [AlbumsService , AlbumsResolver]
})
export class AlbumsModule {}
