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
confirmarDeposito=document.querySelector("#confirmar-deposito");
ingresarMonto=document.querySelector("#ingresar-monto");
saldoInsuficiente=document.querySelector("#saldo-infuciente");
console.log(retiraEfectivo);
confirmarRetiroDinero=document.querySelector("#confirmar-retirar-efectivo");
volverOperacionesHoyDesdeDetalleRetiro=document.querySelector("#volver-operaciones-hoy-detalle-retiro");
ingresClaveCajero=document.querySelector("#ingresa-tu-clave-cajero");
claveCajero=document.querySelector("#clave-cajero"); 
mensajeClaveIncorrecta=document.querySelector("#clave-incorrecta");
autorizando=document.querySelector("#autorizando");
verificandotuclave=document.querySelector("#verificando-tu-clave");
final=document.querySelector("#final");
finalmontoretirad=document.querySelector("#monto-retirado");
finalsaldo=document.querySelector("#saldo-final");


let saldo=0;
let saldoRetirar=0;
let cuentasBCP =
[
    {nombre:"Carlos",password:"1254",dni:"73377610",saldo:100},
    {nombre:"Gera",password:"1234",dni:"12345678", saldo:2500},
    {nombre:"Sabi",password:"0912",dni:"44517284", saldo:90},
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
    dineroRetirarInput.addEventListener("blur",(e)=>{
            montoRetiro.innerHTML="";
        if(e.target.value.trim()!==''){
            saldoRetirar=e.target.value;
            console.log(saldoRetirar);
            confirmarDeposito.disabled=false;
            confirmarDeposito.style.backgroundColor="#012771";
            confirmarDeposito.style.color="white";
        }
        else{
            saldoRetirar=0;
            console.log(saldoRetirar);
            confirmarDeposito.disabled=true;
            confirmarDeposito.style.backgroundColor="#b7b7bf";
            confirmarDeposito.style.color="gray";
        }
    });
    confirmarDeposito.addEventListener("click",(e)=>{
        e.preventDefault();
        saldoInsuficiente.innerHTML="";

        if(saldoRetirar<20 && !saldoRetirar%10===0){
            saldoInsuficiente.innerHTML="";
            let mensajeBilleteNoDisponible=document.createElement("p");
            mensajeBilleteNoDisponible.textContent="Billete no disponible";
            mensajeBilleteNoDisponible.style.color="#012771;"
            mensajeBilleteNoDisponible.style.fontSize="25px";
            mensajeBilleteNoDisponible.style.marginTop ="25px";
            saldoInsuficiente.appendChild(mensajeBilleteNoDisponible)
        }

        else {
            if(saldoRetirar>saldo){
                MensajeSaldoInsuficiente();
            }
            else {
                if(saldoRetirar%10===0){
                    saldo-=saldoRetirar;
                    console.log("Saldo Actual"+saldo);
                    let elemento=document.createElement("h3");
                    console.log("Saldo a Retirar"+saldoRetirar);
                    elemento.textContent=`${saldoRetirar}`
                    montoRetiro.appendChild(elemento);
                    ocultarPantalla(retiraEfectivo);
                    mostrarPantalla(detallesRetiro); 
                    mostrarsaldo();
                }
                else {
                    let mensajeBilleteNoDisponible=document.createElement("p");
                    mensajeBilleteNoDisponible.textContent="Billete no disponible";
                    mensajeBilleteNoDisponible.style.color="#012771;"
                    mensajeBilleteNoDisponible.style.fontSize="25px";
                    mensajeBilleteNoDisponible.style.marginTop ="25px";
                    saldoInsuficiente.appendChild(mensajeBilleteNoDisponible)
                }

              
             }
            

        }
        

    });
    volverOperacionesHoyDesdeDetalleRetiro.addEventListener("click",()=>{
        let saldoRetirado=Number.parseInt(saldoRetirar);
        console.log("Saldo Retirado"+saldoRetirado);
        console.log(typeof(saldoRetirado));
        saldo+=saldoRetirado;
        mostrarsaldo();
        ocultarPantalla(detallesRetiro); 
        mostrarPantalla(operacionhoy);
    })
    confirmarRetiroDinero.addEventListener("click",()=>{
                ocultarPantalla(detallesRetiro);
                mostrarPantalla(ingresClaveCajero);
    });
    claveCajero.addEventListener("blur",(e)=>{
        const clave=e.target.value;
        const existeClave=cuentasBCP.some((cuenta)=>cuenta.password==clave);
        finalmontoretirad.innerHTML=`Monto Retirado S/ ${saldoRetirar} `
        finalsaldo.innerHTML=`Saldo Final S/ ${saldo}`

        console.log(existeClave);
        if(existeClave){
            ocultarPantalla(ingresClaveCajero);
            mostrarPantalla(verificandotuclave);

            setTimeout(()=>{
                ocultarPantalla(verificandotuclave);
                mostrarPantalla(autorizando);   
                setTimeout(()=>{
                    ocultarPantalla(autorizando);
                    mostrarPantalla(final);
                    setTimeout(() => {
                        ocultarPantalla(final);
                        mostrarPantalla(pantallaInicio);
                        setTimeout(() => {
                            ocultarPantalla(pantallaInicio);
                            mostrarPantalla(ingresarDNI);
                        }, 3000);
                    }, 3000);
    
                },3000);
                
            },3000);

           

        }
        else{
            console.log("Clave no valida")
            mensajeClaveIncorrecta.innerHTML=`<p>Clave de Cajero invalida</p>`;
        }

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
    e.preventDefault();
    saldoInsuficiente.innerHTML="";
    console.log(retiraEfectivo);
    let elemento=document.createElement("h3");
    elemento.innerHTML="";
    montoRetiro.innerHTML="";
        if(e.target.classList.contains("billete-20")){
          saldoRetirar=20;   
           elemento.textContent=`${saldoRetirar}`
            if(saldo>=saldoRetirar){
                saldo-=saldoRetirar;
                   montoRetiro.appendChild(elemento);
                   mostrarsaldo();
                ocultarPantalla(retiraEfectivo);
                mostrarPantalla(detallesRetiro);
            }
            else{
                MensajeSaldoInsuficiente();
               
            }
       }
       if(e.target.classList.contains("billete-50")){
        saldoRetirar=50;   
         elemento.textContent=`${saldoRetirar}`
          if(saldo>=saldoRetirar){
              saldo-=saldoRetirar;
                 montoRetiro.appendChild(elemento);
                 mostrarsaldo();
              ocultarPantalla(retiraEfectivo);
              mostrarPantalla(detallesRetiro);
          }
          else{
              MensajeSaldoInsuficiente();
             
          }
     }
     if(e.target.classList.contains("billete-100")){
        saldoRetirar=100;   
         elemento.textContent=`${saldoRetirar}`
          if(saldo>=saldoRetirar){
              saldo-=saldoRetirar;
                 montoRetiro.appendChild(elemento);
                 mostrarsaldo();
              ocultarPantalla(retiraEfectivo);
              mostrarPantalla(detallesRetiro);
          }
          else{
              MensajeSaldoInsuficiente();
             
          }
     }
     if(e.target.classList.contains("billete-150")){
        saldoRetirar=150;   
         elemento.textContent=`${saldoRetirar}`
          if(saldo>=saldoRetirar){
              saldo-=saldoRetirar;
                 montoRetiro.appendChild(elemento);
                 mostrarsaldo();
              ocultarPantalla(retiraEfectivo);
              mostrarPantalla(detallesRetiro);
          }
          else{
              MensajeSaldoInsuficiente();
             
          }
     }
}

function validarMontoRetirar(e){
    console.log(e.target.value);
}

function MensajeSaldoInsuficiente(){
    let mensajeSaldoInsuficiente=document.createElement("p");
    mensajeSaldoInsuficiente.textContent="Saldo Insuficiente";
    mensajeSaldoInsuficiente.style.color="#012771;"
    mensajeSaldoInsuficiente.style.fontSize="25px";
    mensajeSaldoInsuficiente.style.marginTop ="25px";
    saldoInsuficiente.appendChild(mensajeSaldoInsuficiente);
}

});

