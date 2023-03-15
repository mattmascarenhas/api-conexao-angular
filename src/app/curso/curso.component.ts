import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Curso } from './curso';
import { CursoService } from './curso.service';

@Component({
  selector: 'app-curso',
  templateUrl: './curso.component.html',
  styleUrls: ['./curso.component.css'],
})
export class CursoComponent implements OnInit {
  constructor(private cursoServico: CursoService) {}
  //url
  url: string = 'http://localhost/api-angular/php/';
  //vetor
  vetor: Curso[] = [];

  //objeto da classe curso
  curso = new Curso();

  //inicializador
  ngOnInit() {
    this.selecionar();
  }

  //selecao
  selecionar() {
    this.cursoServico.obterCursos().subscribe((res: Curso[]) => {
      this.vetor = res;
    });
  }

  //cadastro
  cadastrar() {
    this.cursoServico.cadastrarCurso(this.curso).subscribe((res: Curso[]) => {
      //add dados ao vetor
      this.vetor = res;
      //limpar os atributos
      this.curso.nome = null;
      this.curso.valor = null;
      //atualizar a listagem
      this.selecionar();
    });
  }

  //alterar
  alterar() {
    this.cursoServico.atualizarCurso(this.curso).subscribe((res: Curso[]) => {
      //atualizar o vetor
      this.vetor = res;
      //limpar os valores do objeto
      this.curso.nome = null;
      this.curso.valor = null;
      //atualizar a listagem
      this.selecionar();
    });
  }

  //remover
  remover() {
    this.cursoServico.removerCurso(this.curso).subscribe((res: Curso[]) => {
      //add dados ao vetor
      this.vetor = res;
      //limpar os atributos
      this.curso.nome = null;
      this.curso.valor = null;
      //atualizar a listagem
      this.selecionar();
    });
  }

  //selecao um cutso
  selecionarUmCurso(c: Curso) {
    this.curso.id = c.id;
    this.curso.nome = c.nome;
    this.curso.valor = c.valor;
  }
}
