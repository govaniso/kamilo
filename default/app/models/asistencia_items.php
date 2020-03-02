<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of cursos
 *
 * @author govani
 */
class Asistencia extends ActiveRecord {
		//put your code here
		public $source = "k_asistencia";

		public function after_create() {
				$curso = ( new Cursos() )->find($this->c_id);

				$alumnos = $curso->get_alumnos();
				foreach ($alumnos as $a):
						
				endforeach;
		}

}
