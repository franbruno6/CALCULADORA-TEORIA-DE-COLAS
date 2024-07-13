import { Alert, Button, Label, TextInput } from "flowbite-react";
import { useState } from "react";

export default function MM1N() {
    const [errorMessage, setErrorMessage] = useState(null);
    const [lambda, setLambda] = useState(0);
    const [mu, setMu] = useState(0);
    const [capacidadMaxima, setCapacidadMaxima] = useState(0);
    const [calculando, setCalculando] = useState(false);
    const [resultados, setResultados] = useState({});
    const [formData, setFormData] = useState({
        lambda: '',
        mu: '',
        capacidadMaxima: '',
    });
    const [validity, setValidity] = useState({
        lambda: true,
        mu: true,
        capacidadMaxima: true,
    });

    const calcularDatos = (lambda, mu, capacidadMaxima) => {

        setCalculando(true);

        const rho = lambda / mu;
        const pb = ((Math.pow(rho, capacidadMaxima)) * (1 - rho)) / (1 - Math.pow(rho, capacidadMaxima + 1));
        const tau = lambda * pb;
        const yi = lambda - tau;
        const yo = yi;
        
        let ls = 0;
        if (rho === 1){
            ls = capacidadMaxima / 2;
        }
        else {
            ls = (rho / (1 - rho)) - ((capacidadMaxima + 1) * Math.pow(rho, capacidadMaxima + 1)) / (1 - Math.pow(rho, capacidadMaxima + 1));
        }

        let lq = 0;
        if (rho === 1){
            lq = (capacidadMaxima * (capacidadMaxima - 1)) / (2 * (capacidadMaxima + 1)); 
        }
        else {
            lq = ls - ((1 - Math.pow(rho, capacidadMaxima)) * rho) / (1 - Math.pow(rho, capacidadMaxima + 1))
        }
        
        const p0 = (1 - rho) / (1 - Math.pow(rho, capacidadMaxima + 1));
        const pnResult = Math.pow(rho, capacidadMaxima) * p0;
        const lambdaEfectiva = lambda * (1 - pnResult);
        const rhoEfectiva = lambdaEfectiva / mu;

        let ws = ls / lambdaEfectiva;
        let wq = ws - (1 / mu);
        
        if (isNaN(wq)){
            wq = lq / lambda;
        }

        if (isNaN(ws)){
            ws = wq + (1 / mu);
        }

        const lb = lq / (1 - p0);
        const wb = wq / (1 - p0);

        setResultados({
            rho: rho.toFixed(2),
            pb: (pb * 100).toFixed(2),
            tau: tau.toFixed(2),
            yi: yi.toFixed(2),
            yo: yo.toFixed(2),
            ls: ls.toFixed(2),
            lq: lq.toFixed(2),
            p0: (p0 * 100).toFixed(2),
            pnResult: (pnResult * 100).toFixed(2),
            lambdaEfectiva: lambdaEfectiva.toFixed(2),
            rhoEfectiva: (rhoEfectiva * 100).toFixed(2),
            wq: wq.toFixed(2),
            ws: ws.toFixed(2),
            lb: lb.toFixed(2),
            wb: wb.toFixed(2),
        });

        console.log('Resultados: ', 'rho(ok)' + rho, 'pb ' + pb, 'tau ' + tau, 'yi ' + yi, 'yo ' + yo, 'ls(ok)' + ls, 'lq(ok)' + lq, 'p0(ok)' + p0, 'pnresult ' + pnResult, 'lamefec(ok)' + lambdaEfectiva, 'rhoefec ' + rhoEfectiva, 'wq(ok)' + wq, 'ws(ok)' + ws, 'lb ' + lb, 'wb ' + wb);
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
            case 'capacidadMaxima':
                if (value === '') {
                    isValid = false;
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
        const mu = parseFloat(formData.mu);
        
        const capacidadMaxima = formData.capacidadMaxima === '' ? 0 : parseInt(formData.capacidadMaxima);

        if (isNaN(lambda) || isNaN(mu) || isNaN(capacidadMaxima)) {
            const newValidity = { ...validity };

            if (isNaN(mu)) {
                newValidity.mu = false;
            }
            if (isNaN(lambda)) {
                newValidity.lambda = false;
            }
            if (isNaN(capacidadMaxima)) {
                newValidity.capacidadMaxima = false;
            }

            setValidity(newValidity);
            setCalculando(false);

            return setErrorMessage('Complete los campos requeridos (*) con números válidos');
        }

        if (validity.lambda && validity.capacidadMaxima && validity.mu) {
            setErrorMessage(null);

            setLambda(lambda);
            setMu(mu);
            setCapacidadMaxima(capacidadMaxima);

            console.log('Formulario válido. Realizar cálculos.');
            calcularDatos(lambda, mu, capacidadMaxima);
        } else {
            setCalculando(false);
            return setErrorMessage('Corrija los campos inválidos');
        }
    };
    
    return (
        <div className='mt-10'>
            <div  className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5'>
                {/* left side */}
                <div className='flex-1'>
                    <h2 className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white">
                        M/M/1/N
                    </h2>
                    <p>
                        El sistema M/M/1/N es un sistema de colas con un solo servidor y una capacidad máxima de N clientes en el sistema.
                    </p>
                    <p>
                        Como en el sistema M/M/1, los clientes llegan al sistema siguiendo un proceso de Poisson con tasa de arribos λ y son atendidos por el servidor con tasa de servicio μ.
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
                            <Label value='Capacidad máxima (N)*' />
                            <TextInput
                                type='text'
                                placeholder='Ingrese la capacidad máxima (número entero)'
                                id='capacidadMaxima'
                                value= {formData.capacidadMaxima}
                                onChange={handleChange}
                                color={validity.capacidadMaxima ? 'success' : 'failure'}
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
                            <p>N = {capacidadMaxima}</p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-4 w-full">
                            <div className="flex-1 p-3">
                                <p>
                                    ρ = {resultados.rho}
                                </p>
                                <p>
                                    ρ efectivo = {resultados.rhoEfectiva}%
                                </p>
                                <p>
                                    Ls = {resultados.ls}
                                </p>
                                <p>
                                    Lq = {resultados.lq}
                                </p>
                                <p>
                                    θ tasa de rechazo = {resultados.tau}
                                </p>
                                <p>
                                    Lb = {resultados.lb}
                                </p>
                                <p>
                                    Yi = {resultados.yi}
                                </p>
                            </div>
                            <div className="flex-1 p-3">
                                <p>
                                    λ efectiva = {resultados.lambdaEfectiva}
                                </p>
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
                                    Pb = {resultados.pb}%
                                </p>
                                <p>
                                    Wb = {resultados.wb}
                                </p>
                                <p>
                                    Yo = {resultados.yo}
                                </p>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    )
}
