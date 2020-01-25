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
    
    public function get_alumnos($curso_id){
        $sql = "SELECT u.id,
                        u.official_code as no_control,  
                        u.lastname AS apellidos, 
                        u.firstname AS nombre
                    FROM course_rel_user cu
            INNER JOIN user u ON u.id = cu.user_id
            WHERE cu.c_id = $curso_id
            ORDER BY u.lastname;
            ";
         return $this->find_all_by_sql($sql);
    }
    
}
