import { Alert, Button, Label, TextInput } from "flowbite-react";
import { useState } from "react";

export default function MM2() {
    const [errorMessage, setErrorMessage] = useState(null);
    const [lambda, setLambda] = useState(0);
    const [mu1, setMu1] = useState(0);
    const [mu2, setMu2] = useState(0);
    const [pn, setPn] = useState(0);
    const [calculando, setCalculando] = useState(false);
    const [resultados, setResultados] = useState({});
    const [resultadosConSeleccion, setResultadosConSeleccion] = useState({});
    const [resultadosSinSeleccion, setResultadosSinSeleccion] = useState({});
    const [formData, setFormData] = useState({
        lambda: '',
        mu1: '',
        mu2: '',
        pn: '',
    });
    const [validity, setValidity] = useState({
        lambda: true,
        mu1: true,
        mu2: true,
        pn: true,
    });

    const calcularDatos = (lambda, mu1, mu2, pn) => {
        const mu = mu1 + mu2;
        
        setCalculando(true);

        const rho = lambda / mu;
        const lq = Math.pow(rho, 2) / (1 - rho);
        const wq = lq / lambda;
        const tiempoServicio = 1 / mu;
        const tiempoLlegada = 1 / lambda;
        
        let pnResult = 0;
        if (pn > 0) {
            pnResult = (1 - pn) * Math.pow(rho, pn);
        }

        let p0 = 0;
        let ls = 0;
        let ws = 0;
        let n = 0;
        
        if (mu1 === mu2) {
            p0 = 1 - rho;
            ls = rho / (1 - rho);
            ws = ls / lambda;
            n = lambda * ws;
            
            setResultados({
                rho: rho.toFixed(2),
                lq: lq.toFixed(2),
                wq: wq.toFixed(2),
                pnResult: (pnResult * 100).toFixed(2),
                p0: (p0 * 100).toFixed(2),
                ls: ls.toFixed(2),
                ws: ws.toFixed(2),
                n: n.toFixed(2),
                tiempoServicio: tiempoServicio.toFixed(2),
                tiempoLlegada: tiempoLlegada.toFixed(2),
            });
        }
        else {
            calcularConSeleccion(lambda, mu1, mu2, mu, pnResult, rho, lq, wq, tiempoLlegada, tiempoServicio);
            calcularSinSeleccion(lambda, mu1, mu2, mu, pnResult, rho, lq, wq, tiempoLlegada, tiempoServicio);
        }
    };

    const calcularConSeleccion = (lambda, mu1, mu2, mu, pnResult, rho, lq, wq, tiempoLlegada, tiempoServicio) => {
        const r = mu2 / mu1;
        const aPrima = ((2 * lambda + mu) * (mu1 * mu2)) / (mu * (lambda + mu2));
        const p0 = (1 - rho) / (1 - rho + (lambda / aPrima));
        const ls = lambda / ((1 - rho) * (lambda + (1 - rho) * aPrima));
        const ws = ls / lambda;
        const n = lambda * ws;

        const a = (1 + Math.pow(r, 2));
        const b = -(2 + Math.pow(r, 2));
        const c = -(2 * r - 1) * (1 + r);

        const pc = resolverEcuacionCuadratica(a, b, c);

        resolverEcuacionCuadratica(a, b, c);

        setResultadosConSeleccion({
            rho: rho.toFixed(2),
            lq: lq.toFixed(2),
            wq: wq.toFixed(2),
            pnResult: (pnResult * 100).toFixed(2),
            p0: (p0 * 100).toFixed(2),
            ls: ls.toFixed(2),
            ws: ws.toFixed(2),
            n: n.toFixed(2),
            tiempoServicio: tiempoServicio.toFixed(2),
            tiempoLlegada: tiempoLlegada.toFixed(2),
            aPrima: aPrima.toFixed(2),
            pc: pc.toFixed(2),
        });
    };

    const resolverEcuacionCuadratica = (a, b, c) => {
        if (a === 0) {
            throw new Error("El coeficiente 'a' no puede ser cero en una ecuación cuadrática.");
        }
    
        const discriminante = Math.pow((b), 2) - 4 * (a) * (c);
    
        if (discriminante < 0) {
            throw new Error("La ecuación no tiene raíces reales.");
        }
    
        const raizDiscriminante = Math.sqrt(discriminante);
    
        const x1 = (-(b) + raizDiscriminante) / (2 * (a));
        const x2 = (-(b) - raizDiscriminante) / (2 * (a));

        console.log('x1 =', x1);
        console.log('x2 =', x2);

        if (x1 > 0) {
            return x1;
        }
        else if (x2 > 0) {
            return x2;
        }
    
    }

    const calcularSinSeleccion = (lambda, mu1, mu2, mu, pnResult, rho, lq, wq, tiempoLlegada, tiempoServicio) => {
        const r = mu2 / mu1;
        const a = (2 * mu1 * mu2) / (mu1 + mu2);
        const p0 = (1 - rho) / (1 - rho + (lambda / a));
        const ls = lambda / ((1 - rho) * (lambda + (1 - rho) * a));
        const n = ls;
        const pc = 1 - ((r * (1 + r)) / (1 + Math.pow(r, 2)));
        const ws = ls / lambda;

        setResultadosSinSeleccion({
            rho: rho.toFixed(2),
            lq: lq.toFixed(2),
            wq: wq.toFixed(2),
            pnResult: (pnResult * 100).toFixed(2),
            p0: (p0 * 100).toFixed(2),
            ls: ls.toFixed(2),
            ws: ws.toFixed(2),
            n: n.toFixed(2),
            tiempoServicio: tiempoServicio.toFixed(2),
            tiempoLlegada: tiempoLlegada.toFixed(2),
            pc: pc.toFixed(2),
            a: a.toFixed(2),
        });
    };

    const handleChange = (e) => {
        const { id, value } = e.target;
        let isValid = true;

        switch (id) {
            case 'lambda':
                isValid = /^\d*\.?\d*$/.test(value);
                break;
            case 'mu1':
                isValid = /^\d*\.?\d*$/.test(value);
                break;
            case 'mu2':
                isValid = /^\d*\.?\d*$/.test(value);
                break;
            case 'pn':
                if (value === '') {
                    isValid = true;
                    break;
                }
                isValid = /^\d+$/.test(value);
                break;
            default:
                break;
        }

        setFormData({ ...formData, [id]: value.trim() });
        setValidity({ ...validity, [id]: isValid });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setErrorMessage(null);

        const lambda = parseFloat(formData.lambda);
        const mu1 = parseFloat(formData.mu1);
        const mu2 = parseFloat(formData.mu2);

        if (mu1 < mu2) {
            setErrorMessage('El tiempo de servicio 1 debe ser mayor o igual al tiempo de servicio 2');
            return setCalculando(false);
        }

        const pn = formData.pn === '' ? 0 : parseInt(formData.pn);

        if (isNaN(lambda) || isNaN(mu1) || isNaN(mu2)) {
            const newValidity = { ...validity };

            if (isNaN(mu1)) {
                newValidity.mu1 = false;
            }
            if (isNaN(mu2)) {
                newValidity.mu2 = false;
            }
            if (isNaN(lambda)) {
                newValidity.lambda = false;
            }

            setValidity(newValidity);
            setCalculando(false);

            return setErrorMessage('Complete los campos requeridos (*) con números válidos');
        }

        if (validity.lambda && validity.mu1 && validity.mu2 && validity.pn) {
            setErrorMessage(null);

            setLambda(lambda);
            setMu1(mu1);
            setMu2(mu2);
            setPn(pn);
            
            console.log('Formulario válido. Realizar cálculos.');
            calcularDatos(lambda, mu1, mu2, pn);
        } else {
            setCalculando(false);
            return setErrorMessage('Corrija los campos inválidos');
        }
    };
    
    return (
        <div className='mt-10 pb-40'>
            <div  className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5'>
                {/* left side */}
                <div className='flex-1'>
                    <h2 className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white">
                        M/M/2
                    </h2>
                    <p>
                        El sistema M/M/2 es un sistema de colas que se caracteriza por tener dos servidores y una sola fila de espera.
                    </p>
                    <p>
                        La distribución de llegadas y de servicio son de tipo exponencial.
                    </p>
                </div>
                {/* right side */}
                <div className='flex-1'>
                    <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
                        <div>
                            <Label value='Tasa de arribos (λ)*' />
                            <TextInput 
                                type='text'
                                placeholder='Ingrese la tasa de arribos'
                                id='lambda'
                                value= {formData.lambda}
                                onChange={handleChange}
                                color={validity.lambda ? 'success' : 'failure'}
                                />
                        </div>
                        <div>
                            <Label value='Tiempo de servicio 1 (igual o más rápido - µ1)*' />
                            <TextInput
                                type='text'
                                placeholder='Ingrese el tiempo de servicio 1'
                                id='mu1'
                                value= {formData.mu1}
                                onChange={handleChange}
                                color={validity.mu1 ? 'success' : 'failure'}
                            />
                        </div>
                        <div>
                            <Label value='Tiempo de servicio 2 (igual o más lento - µ2)*' />
                            <TextInput
                                type='text'
                                placeholder='Ingrese el tiempo de servicio 2'
                                id='mu2'
                                value= {formData.mu2}
                                onChange={handleChange}
                                color={validity.mu2 ? 'success' : 'failure'}
                            />
                        </div>
                        <div>
                            <Label value='Prob. de que haya n clientes en el sistema (Pn)' />
                            <TextInput
                                type='text'
                                placeholder='Ingrese el valor de n (número entero)'
                                id='pn'
                                value={formData.pn}
                                onChange={handleChange}
                                color={validity.pn ? 'success' : 'failure'}
                            />
                        </div>
                        {
                            errorMessage && (
                            <Alert color='failure'>
                                {errorMessage}
                            </Alert>
                            )
                        }
                        <Button 
                            gradientDuoTone='purpleToPink'
                            type='submit'
                        >
                            Calcular
                        </Button>
                    </form>
                </div>
            </div>
            {/* Resultados */}
            {
                calculando && (
                    <div className="flex flex-col items-center p-3 max-w-3xl mx-auto gap-5 bg-gray-200 rounded-lg">
                        <h3 className="text-center text-xl font-semibold dark:text-white">
                            { mu1 === mu2 ? (
                                <>
                                    Resultados servidores misma velocidad
                                </>
                                ) : (
                                <>
                                    Resultados servidores distinta velocidad
                                </>
                            )}
                        </h3>
                        <div className="flex flex-row gap-5">
                            <p>λ (Lambda) = {lambda}</p>
                            <p>µ1 (Mu) = {mu1}</p>
                            <p>µ2 (Mu) = {mu2}</p>
                            <p>Pn = {pn}</p>
                        </div>
                        { mu1 === mu2 ? (
                            <div className="flex flex-col sm:flex-row gap-4 w-full">
                                <div className="flex-1 p-3">
                                    <p>
                                        ρ = {resultados.rho}
                                    </p>
                                    <p>
                                        Ls = {resultados.ls}
                                    </p>
                                    <p>
                                        Lq = {resultados.lq}
                                    </p>
                                    <p>
                                        Tiempo de llegada = {resultados.tiempoLlegada}
                                    </p>
                                    <p>
                                        Nro medio clientes en sistema (N) = {resultados.n}
                                    </p>
                                </div>
                                <div className="flex-1 p-3">
                                    <p>
                                        P0 = {resultados.p0}%
                                    </p>
                                    <p>
                                        Ws = {resultados.ws}
                                    </p>
                                    <p>
                                        Wq = {resultados.wq}
                                    </p>
                                    <p>
                                        Tiempo de servicio = {resultados.tiempoServicio}
                                    </p>
                                    <p>
                                        { pn > 0 ? (
                                            <>
                                                P{pn} = {resultados.pnResult}%
                                            </>
                                        ) : (
                                            <>
                                                Pn no solicitado.
                                            </>
                                        )}
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <>
                                <div className="text-xl">Con selección de servidor</div>
                                <div className="flex flex-col sm:flex-row gap-4 w-full">
                                    <div className="flex-1 p-3">
                                        <p>
                                            ρ = {resultadosConSeleccion.rho}
                                        </p>
                                        <p>
                                            Ls = {resultadosConSeleccion.ls}
                                        </p>
                                        <p>
                                            Lq = {resultadosConSeleccion.lq}
                                        </p>
                                        <p>
                                            Tiempo de llegada = {resultadosConSeleccion.tiempoLlegada}
                                        </p>
                                        <p>
                                            Nro medio clientes en sistema (N) = {resultadosConSeleccion.n}
                                        </p>
                                        <p>
                                            Punto crítico (Pc) = {resultadosConSeleccion.pc}
                                        </p>
                                    </div>
                                    <div className="flex-1 p-3">
                                        <p>
                                            P0 = {resultadosConSeleccion.p0}%
                                        </p>
                                        <p>
                                            Ws = {resultadosConSeleccion.ws}
                                        </p>
                                        <p>
                                            Wq = {resultadosConSeleccion.wq}
                                        </p>
                                        <p>
                                            Tiempo de servicio = {resultadosConSeleccion.tiempoServicio}
                                        </p>
                                        <p>
                                            { pn > 0 ? (
                                                <>
                                                    P{pn} = {resultadosConSeleccion.pnResult}%
                                                </>
                                            ) : (
                                                <>
                                                    Pn no solicitado.
                                                </>
                                            )}
                                        </p>
                                        <p>
                                            a prima = {resultadosConSeleccion.aPrima}
                                        </p>
                                    </div>
                                </div>
                                <div className="text-xl">Sin selección de servidor</div>
                                <div className="flex flex-col sm:flex-row gap-4 w-full">
                                    <div className="flex-1 p-3">
                                        <p>
                                            ρ = {resultadosSinSeleccion.rho}
                                        </p>
                                        <p>
                                            Ls = {resultadosSinSeleccion.ls}
                                        </p>
                                        <p>
                                            Lq = {resultadosSinSeleccion.lq}
                                        </p>
                                        <p>
                                            Tiempo de llegada = {resultadosSinSeleccion.tiempoLlegada}
                                        </p>
                                        <p>
                                            Nro medio clientes en sistema (N) = {resultadosSinSeleccion.n}
                                        </p>
                                        <p>
                                            Punto crítico (Pc) = {resultadosSinSeleccion.pc}
                                        </p>
                                    </div>
                                    <div className="flex-1 p-3">
                                        <p>
                                            P0 = {resultadosSinSeleccion.p0}%
                                        </p>
                                        <p>
                                            Ws = {resultadosSinSeleccion.ws}
                                        </p>
                                        <p>
                                            Wq = {resultadosSinSeleccion.wq}
                                        </p>
                                        <p>
                                            Tiempo de servicio = {resultadosSinSeleccion.tiempoServicio}
                                        </p>
                                        <p>
                                            { pn > 0 ? (
                                                <>
                                                    P{pn} = {resultadosSinSeleccion.pnResult}%
                                                </>
                                            ) : (
                                                <>
                                                    Pn no solicitado.
                                                </>
                                            )}
                                        </p>
                                        <p>
                                            a prima = {resultadosSinSeleccion.a}
                                        </p>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                )
            }
        </div>
    )
}
