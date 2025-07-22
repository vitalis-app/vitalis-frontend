// video-player.component.ts
import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

interface VideoTag {
  name: string;
  link?: string; // Opcional, caso queira que a tag seja um link
}

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.css']
})
export class VideoPlayerComponent implements OnInit {
  @Input() videoId: string = '';
  @Input() title: string = 'Título do Vídeo';
  @Input() description: string = 'Breve descrição do vídeo, com no máximo 200 caracteres para garantir que o texto não ocupe muito espaço e mantenha o layout limpo. Esta é uma descrição de exemplo.';
  @Input() channelName: string = 'Nome do Canal';
  @Input() views: number = 0;
  @Input() duration: string = '00:00';
  @Input() tags: VideoTag[] = [];

  youtubeEmbedUrl!: SafeResourceUrl;
  youtubeWatchUrl!: string;

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.youtubeEmbedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${this.videoId}?autoplay=0&controls=1&showinfo=0&rel=0`);
    this.youtubeWatchUrl = `https://www.youtube.com/watch?v=${this.videoId}`;
  }



  openYoutubeLink(): void {
    window.open(this.youtubeWatchUrl, '_blank');
  }

  handleTagClick(tag: VideoTag): void {
    if (tag.link) {
      window.open(tag.link, '_blank');
    } else {
      console.log(`Tag clicada: ${tag.name}`);
      // Implementar lógica de filtro ou pesquisa aqui, se necessário
    }
  }
}
