<?php

  if(isset($_GET['jugador']) && isset($_GET['puntaje'])){
    $jsondata['success'] = true;
    $jsondata['message'] = 'Valores recibidos ->'.$_GET['jugador'].', '.$_GET['puntaje'];
  }else{
    $jsondata['success'] = false;
    $jsondata['message'] = 'Valores no recibidos.';
  }

  header('Content-type: application/json; charset=utf-8');
  echo json_encode($jsondata);