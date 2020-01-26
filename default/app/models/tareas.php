<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of tareas
 *
 * @author govani
 */
class Tareas extends ActiveRecord {
		//put your code here
		public $source = "c_student_publication";

		/*
		 * No se por que pero En chamilo
		 * el id es igual que el iid
		 */
		public function after_create() {
				$this->id = $this->iid;
				$this->save();
		}

		public function get_items($tarea_id) {
				$sql = "SELECT t.id, 
c_id,
                        u.official_code as no_control,  
                        u.lastname AS apellidos, 
                        u.firstname AS nombre, 
                        t.qualification AS calificacion
                        FROM c_student_publication t
                INNER JOIN user u ON u.id = t.user_id
                WHERE t.parent_id = $tarea_id
                ORDER BY u.lastname";


				return $this->find_all_by_sql($sql);
		}

		public function set_calificacion($qualification = 0) {
				$this->date_of_qualification = date('Y-m-d H:i:s');
				$this->qualification = $qualification;
				$this->save();
				return $this;
		}

		public function no_envio_tarea($item) {
				$c_id = $item["c_id"];
				$user_id = $item["user_id"];
				$parent_id = $item["parent_id"];

				$tarea = new Tareas();
				$tarea->c_id = $c_id;
				//$tarea->url = '';
				$tarea->filetype = 'file';
				$tarea->title = 'no envio';
				$tarea->description = '';
				$tarea->contains_file = '0';
				$tarea->active = true;
				$tarea->accepted = true;
				$tarea->qualificator_id = 1;
				$tarea->document_id = '0';
				$tarea->weight = '0';
				$tarea->allow_text_assignment = '0';
				$tarea->post_group_id = '0'	;
				$tarea->sent_date = date('Y-m-d H:i:s');
				$tarea->parent_id = $parent_id;
				$tarea->session_id = null;
				$tarea->user_id = $user_id;
				$tarea->has_properties = '0';
				$tarea->qualification = '0';
				$this->date_of_qualification = date('Y-m-d H:i:s');
				$tarea->save();
				return $tarea;
		}


}
