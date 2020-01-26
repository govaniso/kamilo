<?php

class CursosController extends AppController {

		public function index() {
		}

		public function show($id) {
				$this->curso = ( new Cursos() )->find($id);
		}

		public function alumnos($curso_id) {
				$this->curso = ( new Cursos() )->find($curso_id);

				$this->alumnos = $this->curso->get_alumnos();
		}

		public function tareas($curso_id) {
				$this->curso = ( new Cursos() )->find($curso_id);
				$this->curso_id = $curso_id;
				$this->tareas = ( new Tareas() )->find("parent_id = 0 and c_id = $curso_id");
		}

		public function calificar($curso_id, $tarea_id) {
				$this->curso = ( new Cursos() )->find($curso_id);
				$this->tareas = $this->curso->get_tareas($tarea_id);
				$this->tarea_id = $tarea_id;
 		}

}
