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
class Cursos extends ActiveRecord {
		//put your code here
		public $source = "gradebook_category";


		/*
		 * Retorna la lista de los alumnos inscritos en el curso
		*/
		public function get_alumnos() {
				//Tomado del log de mysql, cuando consultamos los usuatios del curso
				$sql = "SELECT DISTINCT course_rel_user.status AS status_rel,
																user.id,
																user.official_code as no_control,  
																user.lastname AS apellidos, 
																user.firstname AS nombre,                        
                                user.id AS user_id,
                                user.email,
                                course_rel_user.is_tutor,
                                user.*  
                                FROM user AS user 
                      LEFT JOIN course_rel_user AS course_rel_user
                      ON  user.id = course_rel_user.user_id AND course_rel_user.relation_type <> 1
                       INNER JOIN course course 
                       ON course_rel_user.c_id = course.id  
                       AND course_rel_user.c_id = $this->id 
                       WHERE  course_rel_user.status = 5 
                       AND   course_rel_user.c_id IS NOT NULL  ORDER BY user.lastname, user.firstname";

				return $this->find_all_by_sql($sql);
		}

		/*
		 * Devuelve todas las tareas de los alumnos y tambien de quienes no la enviaron
		 *
		 */
		function get_tareas($tarea_id) {

				$sql = "SELECT DISTINCT
                        u.user_id,
                        work.id AS id,   
                        work.c_id,                     
                        title AS title,
                        description,
                        url,
                        sent_date,
                        contains_file,
                        has_properties,
                        view_properties,
                        qualification,
                        weight,
                        allow_text_assignment,
                        u.firstname as nombre,
                        u.lastname as apellidos,
                        u.username,
                        u.official_code,
                        parent_id,
                        accepted,
                        qualificator_id,
                        url_correction,
                        title_correction
                        
                FROM c_student_publication work 
                INNER JOIN user u  
                ON (work.user_id = u.user_id)
                WHERE
                    work.c_id = $this->id AND
                     (work.post_group_id = '0' OR work.post_group_id IS NULL)  AND work.active IN (0, 1)  AND parent_id  = $tarea_id  
                     
                     AND  (work.session_id = 0 OR work.session_id IS NULL)
                    AND u.status != 20
                ORDER BY lastname, firstname ASC";

				$tareas = $this->find_all_by_sql($sql);

				$ids = [];
				foreach ($tareas as $t) {
						$ids[] = $t->user_id;
				}

				$sql = "SELECT
												u.user_id,
												NULL AS id,   
												$this->id AS c_id,                     
												title AS title,
												'' AS   description,
												NULL AS    url,
												NULL AS   sent_date,
												NULL AS  contains_file,
												NULL AS  has_properties,
												NULL AS  view_properties,
												0 AS  qualification,
												NULL AS  weight,
												NULL AS allow_text_assignment,
												u.firstname AS nombre,
												u.lastname AS apellidos,
												u.username,
												u.official_code,
												$tarea_id AS parent_id,
												NULL AS accepted,
												NULL AS qualificator_id,
												NULL AS url_correction,
												NULL AS title_correction 
                    FROM `user` AS u 
                      LEFT JOIN course_rel_user AS course_rel_user
                      ON  u.id = course_rel_user.user_id AND course_rel_user.relation_type <> 1
                       INNER JOIN course course 
                       ON course_rel_user.c_id = course.id  
                       AND course_rel_user.c_id = $this->id
                       WHERE  course_rel_user.status = 5 
                       AND   course_rel_user.c_id IS NOT NULL   
                       AND u.`id` NOT IN (".implode(",", $ids).")
                    ORDER BY u.lastname, u.firstname   ";

				$alumnos_sin_tareas = $this->find_all_by_sql($sql);
				return array_merge($tareas, $alumnos_sin_tareas);
		}

}
