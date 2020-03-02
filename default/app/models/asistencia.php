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
    public $logger = true;

    public function after_create() {
        $curso = ( new Cursos())->find_first($this->c_id);

        $alumnos = $curso->get_alumnos();
        foreach ($alumnos as $a):
            $item = new AsistenciaItems();
            $item->a_id = $this->id;
            $item->user_id = $a->id;
            $item->save();
        endforeach;
    }
    
    public function get_lista($c_id, $fecha){
        $sql = "SELECT u.`official_code`,  u.`firstname`, u.`lastname`, ai.`asistio` FROM `k_asistencia` a
                        INNER JOIN `k_asistencia_items` ai ON ai.`a_id` = a.`id`
                        INNER JOIN `user` u ON u.`id` = ai.user_id
                        WHERE DATE_FORMAT( a.`fecha`, '%Y-%m-%d') = '$fecha'
                                        AND a.`c_id` = $c_id";
       return (new Asistencia())->find_all_by_sql($sql);
    }

    public function get_asistencia($c_id, $g_id, $fecha) {
        $asistencia = (new Asistencia())->find_first("c_id = $c_id AND DATE_FORMAT(fecha, '%Y-%m-%d') = '$fecha'");
        if ($asistencia) {
            return $asistencia;
        } else {
            $asistencia = new Asistencia();
            $asistencia->fecha = $fecha;
            $asistencia->c_id = $c_id;
            $asistencia->save();
        }
        return (new Asistencia())->find_first("c_id = $c_id AND DATE_FORMAT(fecha, '%Y-%m-%d') = '$fecha'");
    }

}
