<?php


class TareasController extends appController {

		/*
		 * /tareas/calificar/$c_id/$t_id
		 * params post
		 * 	calificacion
		 */
		function calificar($c_id, $t_id = null) {
				$params = Input::json();

				if ($t_id == null) {
						View::json((new Tareas())->no_envio_tarea($params["item"]));
				} else {
						$tarea = ( new Tareas() )->find_first("c_id = $c_id AND id = $t_id");
						$calif = $params["qualification"];
						View::json($tarea->set_calificacion($calif));
				}
		}

}