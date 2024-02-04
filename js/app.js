//Inicializando vairables
pantallaInicio=document.querySelector("#pantalla-inicio");
esperarMomento=document.querySelector("#esperar-momento");
ingresarDNI=document.querySelector("#ingresar-dni");
inputIngresarDNI=document.querySelector("#input-ingresa-dni");
mensajeDnIncorrecto=document.querySelector("#dni-incorrecto");
validandoDNI=document.querySelector("#validando-ingresar-dni");
operacionhoy=document.querySelector("#operacion-hoy");
retirarEfectivo=document.querySelector("#retirar-efectivo");
verSaldoDisponible=document.querySelector("#ver-saldo-disponible");
depositarEfectivo=document.querySelector("#depositar-efectivo");
botonmostrarSaldo=document.querySelector("#mostrar-saldo");
iconoSaldo=document.querySelector("#icono-saldo");
contenedorSaldo=document.querySelector("#monto-retirar");
volverOperacioneHoy=document.querySelector("#volver-operaciones-hoy");
mostrarSaldo=document.querySelector("#mostrar-saldo");
retiraEfectivo=document.querySelector("#seleccione-monto-retirar");
dineroRetirar=document.querySelector("#billetes-retirar");
volverOperacionHoyDesdeRetiro=document.querySelector("#volver-operaciones-hoy-desde-retiro");
detallesRetiro=document.querySelector("#detalle-retiro");
montoRetiro=document.querySelector("#monto-retirar");
saldoDisponible=document.querySelector("#saldo-disponible");
dineroRetirarInput=document.querySelector("#dinero-retirar-input");


console.log(retiraEfectivo);

let saldo=0;
let saldoRetirar=0;
let cuentasBCP =
[
    {nombre:"Carlos",password:"1234",dni:"73377610",saldo:2500},
    {nombre:"Gera",password:"1234",dni:"12345678", saldo:2500},
    {nombre:"Sabi",password:"1234",dni:"44517284", saldo:90},
];


//Eventos
document.addEventListener('DOMContentLoaded',()=>{
    
    ingresarTarjeta();
    inputIngresarDNI.addEventListener("blur",validarDni);
    botonmostrarSaldo.addEventListener("click",mostrarsaldo);
    retirarEfectivo.addEventListener("click",()=>{
        ocultarPantalla(operacionhoy);
        mostrarPantalla(retiraEfectivo);
    });
    verSaldoDisponible.addEventListener("click",()=>{
            mostrarPantalla(mostrarSaldo);
            ocultarPantalla(operacionhoy);
    });
    volverOperacioneHoy.addEventListener("click",volverOperacionesHoy);
    dineroRetirar.addEventListener("click", retirarDinero);
    volverOperacionHoyDesdeRetiro.addEventListener("click",()=>{
            ocultarPantalla(retiraEfectivo);
            mostrarPantalla(operacionhoy);
    });
  
//Ingresando tarjeta
function ingresarTarjeta(){
    mostrarPantalla(pantallaInicio);
    setTimeout(()=>{
        ocultarPantalla(pantallaInicio);
        mostrarPantalla(esperarMomento);

        setTimeout(()=>{
            ocultarPantalla(esperarMomento)
            mostrarPantalla(ingresarDNI);
        },3000);
    },3000);
}

//Funcion oculte y lo muestre
function mostrarPantalla(contenedor){
    contenedor.style.display="block";
}
function ocultarPantalla(contenedor){
    contenedor.style.display="none";
}

//Validando DNI
function validarDni(e){
    const dni=e.target.value;
    const existeDNI=cuentasBCP.find((cuenta)=>cuenta.dni===dni);
    console.log(saldo);
    if(existeDNI){
        saldo=existeDNI.saldo;
        console.log("Existe dni"); 
        ocultarPantalla(ingresarDNI);
        mostrarPantalla(validandoDNI);
              setTimeout(()=>{
                ocultarPantalla(validandoDNI);
                 mostrarPantalla(operacionhoy);
             },3000);
    }
    else {
        console.log("No existe dni");
        mensajeDnIncorrecto.innerHTML=`
        <p>Su Numero de DNI es Incorrecto</p>
        `;
        console.log(mensajeDnIncorrecto);      
    }
}


//Mostar Saldo
function mostrarsaldo(e){
    iconoSaldo.remove();
    saldoDisponible.innerHTML=`<p>${saldo}</p>`;

}

//Volver Operaciones Hoy
function volverOperacionesHoy(){
   ocultarPantalla(mostrarSaldo)
   mostrarPantalla(operacionhoy);
}



function verSaldo(){
    ocultarPantalla(operacionhoy);
    mostrarPantalla(contenedorSaldo);
}

function retirarDinero(e){
    let saldoRetirar=0;
    console.log(retiraEfectivo);
    
ocultarPantalla(retiraEfectivo);
   mostrarPantalla(detallesRetiro);

         if(e.target.classList.contains("billete-20")){
             saldoRetirar=20;
             if(saldo>=saldoRetirar){
                 saldo-=saldoRetirar;
                
                 let elemento=document.createElement("h3");
                    console.log("Saldo a Retirar"+saldoRetirar);
                    elemento.textContent=`${saldoRetirar}`
                    montoRetiro.appendChild(elemento);

                 ocultarPantalla(retiraEfectivo);
                 mostrarPantalla(detallesRetiro);

             }
             else{
                 console.log("No tiene saldo");
             }
        
        }
         else if(e.target.classList.contains("billete-50")){
                 saldoRetirar=50;

                 let elemento=document.createElement("h3");
                 console.log("Saldo a Retirar"+saldoRetirar);
                 elemento.textContent=`${saldoRetirar}`
                 montoRetiro.appendChild(elemento);


             if(saldo>=saldoRetirar){
                 saldo-=saldoRetirar;
                 
                 ocultarPantalla(retiraEfectivo);
                 mostrarPantalla(detallesRetiro);
             }
             else{
                console.log("No tiene saldo");
             }
      }
        else if(e.target.classList.contains("billete-100")){
             saldoRetirar=100;
             
             let elemento=document.createElement("h3");
                    console.log("Saldo a Retirar"+saldoRetirar);
                    elemento.textContent=`${saldoRetirar}`
                    montoRetiro.appendChild(elemento);

             if(saldo>=saldoRetirar){
                 saldo-=saldoRetirar;
                 ocultarPantalla(retiraEfectivo);
                 mostrarPantalla(detallesRetiro);
             }
             else{
                 console.log("No tiene saldo");
             }
        }
        else if(e.target.classList.contains("billete-150")){
             saldoRetirar=150;

             let elemento=document.createElement("h3");
             console.log("Saldo a Retirar"+saldoRetirar);
             elemento.textContent=`${saldoRetirar}`
             montoRetiro.appendChild(elemento);  

             if(saldo>=saldoRetirar){
               saldo-=saldoRetirar;
               ocultarPantalla(retiraEfectivo);
               mostrarPantalla(detallesRetiro);
             }
             else{
                 console.log("No tiene saldo");
             }
         }
    
    console.log(saldo);
}

function validarMontoRetirar(e){
    console.log(e.target.value);
}

});