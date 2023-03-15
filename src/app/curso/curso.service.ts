import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Curso } from './curso';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CursoService {
  //url
  url: string = 'http://localhost/api-angular/php/';
  //vetor
  vetor: Curso[] = [];

  constructor(private http: HttpClient) {}

  //obter todos os cursos
  obterCursos(): Observable<Curso[]> {
    return this.http.get(this.url + 'listar').pipe(
      map((res: any) => {
        this.vetor = res['cursos'];
        return this.vetor;
      })
    );
  }

  //cadastrar curso
  cadastrarCurso(c: Curso): Observable<Curso[]> {
    return this.http.post(this.url + 'cadastrar', { cursos: c }).pipe(
      map((res: any) => {
        this.vetor.push(res['cursos']);
        return this.vetor;
      })
    );
  }

  //remover curso
  removerCurso(c: Curso): Observable<Curso[]> {
    const params = new HttpParams().set('id', c.id?.toString());

    return this.http.delete(this.url + 'excluir', { params: params }).pipe(
      map((res: any) => {
        const filter = this.vetor.filter((curso) => {
          return +curso['id'] !== c.id;
        });
        return (this.vetor = filter);
      })
    );
  }
  //remover curso
  atualizarCurso(c: Curso): Observable<Curso[]> {
    //executa a alteracao via url
    return (
      this.http
        .put(this.url + 'alterar', { cursos: c })
        //percorre o vetor para saber qual é o id do curso alterado
        .pipe(
          map((res: any) => {
            const cursoAlterado = this.vetor.find((item) => {
              return +item['id'] === +['id'];
            });
            //altera o valor do vetor local
            if (cursoAlterado) {
              cursoAlterado['nome'] = c['nome'];
              cursoAlterado['valor'] = c['valor'];
            }
            return this.vetor;
          })
        )
    );
  }
}
