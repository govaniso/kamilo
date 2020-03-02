<?php

class AsistenciaController extends AppController {

    function pasa_lista($c_id, $g_id, $fecha) {
        $this->curso = ( new Cursos())->find($c_id);
        $this->alumnos = $this->curso->get_alumnos();

        $this->asistencia = (new Asistencia())->get_asistencia($c_id, $g_id, $fecha);
    }

    public function check($asistencia_id, $no_control) {
        $asistenia = (new Asistencia())->find($asistencia_id);

        $user = (new Cursos())->get_alumno($asistenia->c_id, $no_control);
        $asistencia = (new AsistenciaItems())->find_first("a_id = $asistencia_id AND user_id = $user->id");
        $asistencia->asistio = true;
        $asistencia->save();
        //
        View::json($user);
    }

    public function get_lista($c_id, $fecha) {
        View::json((new Asistencia())->get_lista($c_id, $fecha));
    }

}
