import { Alert, Button, Label, TextInput } from "flowbite-react";
import { useState } from "react";

export default function MG1() {
    const [errorMessage, setErrorMessage] = useState(null);
    const [lambda, setLambda] = useState(0);
    const [mu, setMu] = useState(0);
    const [desvioEstandar, setDesvioEstandar] = useState(0);
    const [calculando, setCalculando] = useState(false);
    const [resultados, setResultados] = useState({});
    const [formData, setFormData] = useState({
        lambda: '',
        mu: '',
        desvioEstandar: '',
    });
    const [validity, setValidity] = useState({
        lambda: true,
        mu: true,
        desvioEstandar: true,
    });

    const calcularDatos = (lambda, mu, desvioEstandar) => {
        setCalculando(true);

        const rho = lambda / mu;
        const lq = (Math.pow(lambda, 2) * Math.pow(desvioEstandar, 2) + Math.pow(rho, 2)) / (2 * (1 - rho));
        const wq = lq / lambda;
        const varianza = Math.pow(desvioEstandar, 2);
        const ws = wq + (1 / mu);
        const ls = rho + lq;
        const p0 = 1 - rho;
        const tiempoLlegada = 1 / lambda;
        const tiempoServicio = 1 / mu;

        setResultados({
            rho: rho.toFixed(2),
            lq: lq.toFixed(2),
            wq: wq.toFixed(2),
            ws: ws.toFixed(2),
            ls: ls.toFixed(2),
            p0: (p0 * 100).toFixed(2),
            tiempoLlegada: tiempoLlegada.toFixed(2),
            tiempoServicio: tiempoServicio.toFixed(2),
            varianza: varianza.toFixed(2),
        });
    };

    const handleChange = (e) => {
        const { id, value } = e.target;
        let isValid = true;

        switch (id) {
            case 'lambda':
                isValid = /^\d*\.?\d*$/.test(value);
                break;
            case 'mu':
                isValid = /^\d*\.?\d*$/.test(value);
                break;
            case 'desvioEstandar':
                isValid = /^\d*\.?\d*$/.test(value);
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
        const mu = parseFloat(formData.mu);
        const desvioEstandar = parseFloat(formData.desvioEstandar);

        if (isNaN(lambda) || isNaN(mu) || isNaN(desvioEstandar)) {
            const newValidity = { ...validity };

            if (isNaN(mu)) {
                newValidity.mu = false;
            }
            if (isNaN(lambda)) {
                newValidity.lambda = false;
            }
            if (isNaN(desvioEstandar)) {
                newValidity.desvioEstandar = false;
            }

            setValidity(newValidity);
            setCalculando(false);

            return setErrorMessage('Complete los campos requeridos (*) con números válidos');
        }

        if (validity.lambda && validity.mu && validity.desvioEstandar) {
            setErrorMessage(null);

            setLambda(lambda);
            setMu(mu);
            setDesvioEstandar(desvioEstandar);
            
            console.log('Formulario válido. Realizar cálculos.');
            calcularDatos(lambda, mu, desvioEstandar);
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
                        M/G/1
                    </h2>
                    <p>
                        El sistema M/G/1 es un sistema de cola con un solo servidor, llegadas de clientes de tipo exponencial y tiempos de servicio de distribución general.
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
                            <Label value='Tiempo de servicio (µ)*' />
                            <TextInput
                                type='text'
                                placeholder='Ingrese el tiempo de servicio'
                                id='mu'
                                value= {formData.mu}
                                onChange={handleChange}
                                color={validity.mu ? 'success' : 'failure'}
                            />
                        </div>
                        <div>
                            <Label value='Desvío estandar (σ)*' />
                            <TextInput
                                type='text'
                                placeholder='Ingrese el desvío estandar'
                                id='desvioEstandar'
                                value={formData.desvioEstandar}
                                onChange={handleChange}
                                color={validity.desvioEstandar ? 'success' : 'failure'}
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
                            Resultados
                        </h3>
                        <div className="flex flex-row gap-5">
                            <p>λ (Lambda) = {lambda}</p>
                            <p>µ (Mu) = {mu}</p>
                            <p>σ (Desvío estandar)= {desvioEstandar}</p>
                        </div>
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
                                    Varianza = {resultados.varianza}
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
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    )
}