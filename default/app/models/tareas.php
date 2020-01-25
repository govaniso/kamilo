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
    
    public function get_items($tarea_id){
        $sql = "SELECT t.id, 
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
}
