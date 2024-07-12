import { Alert, Button, Label, TextInput } from "flowbite-react";
import { useState } from "react";

export default function MM1() {
    const [errorMessage, setErrorMessage] = useState(null);
    const [lambda, setLambda] = useState(0);
    const [mu, setMu] = useState(0);
    const [pax, setPax] = useState(0);
    const [pn, setPn] = useState(0);
    const [calculando, setCalculando] = useState(true);
    const [resultados, setResultados] = useState({});
    const [formData, setFormData] = useState({
        lambda: '',
        mu: '',
        pax: '',
        pn: '',
    });
    const [validity, setValidity] = useState({
        lambda: true,
        mu: true,
        pax: true,
        pn: true,
    });

    const calcularDatos = (lambda, mu, pax, pn) => {
        setCalculando(true);

        console.log(lambda, mu, pax, pn);

        if (mu <= lambda) {
            return setErrorMessage('La tasa de arribos debe ser menor al tiempo de servicio');
        }

        const rho = lambda / mu;
        const p0 = (1 - rho) * 100;
        const lq = Math.pow(lambda, 2) / (mu * (mu - lambda));
        const ls = lambda / (mu - lambda);
        const wq = lambda / (mu * (mu - lambda));
        const ws = 1 / (mu - lambda);
        
        let paxResult = 0;
        let pnResult = 0;
    
        if (pax > 0) {
            let suma = 0;
            for (let i = 0; i < pax; i++) {
                suma += (1-rho) * Math.pow(rho, i);
            }
            paxResult = 1 - suma;
            paxResult = paxResult * 100;
        }

        if (pn > 0) {
            pnResult = (1 - (lambda / mu)) * Math.pow((lambda / mu), pn);
            pnResult = pnResult * 100;
        }

        setResultados({
            rho: rho.toFixed(2),
            p0: p0.toFixed(2),
            lq: lq.toFixed(2),
            ls: ls.toFixed(2),
            wq: wq.toFixed(2),
            ws: ws.toFixed(2),
            paxResult: paxResult.toFixed(2),
            pnResult: pnResult.toFixed(2),
        });
        
        console.log(resultados);
    };

    const handleChange = (e) => {
        const { id, value } = e.target;
        let isValid = true;

        // Validación según el campo
        switch (id) {
            case 'lambda':
                isValid = /^\d*\.?\d*$/.test(value);
                break;
            case 'mu':
                isValid = /^\d*\.?\d*$/.test(value);
                break;
            case 'pax':
                if (value === '') {
                    isValid = true;
                    break;
                }
                isValid = /^\d+$/.test(value);
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
    
        const lambda = parseFloat(formData.lambda);
        const mu = parseFloat(formData.mu);
    
        const pax = formData.pax === '' ? 0 : parseInt(formData.pax);
        const pn = formData.pn === '' ? 0 : parseInt(formData.pn);

        if (isNaN(lambda) || isNaN(mu)) {
            if (isNaN(mu)) {
                setValidity({ ...validity, mu: false });
            }
            if (isNaN(lambda)) {
                setValidity({ ...validity, lambda: false });
            }
            return setErrorMessage('Complete los campos requeridos (*) con números válidos');
        }

        if (validity.lambda && validity.mu && validity.pax && validity.pn) {
            setErrorMessage(null);
            setLambda(formData.lambda);
            setMu(formData.mu);
            setPax(pax);
            setPn(pn);
            console.log('Formulario válido. Realizar cálculos.');
            calcularDatos(lambda, mu, pax, pn);
        } else {
            return setErrorMessage('Corrija los campos inválidos');
        }
    };
    
    return (
        <div className='min-h-screen mt-20'>
            <div  className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5'>
                {/* left side */}
                <div className='flex-1'>
                    <h2 className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white">
                        M/M/1
                    </h2>
                    <p>
                        El modelo M/M/1 es un modelo de colas que se caracteriza por tener un solo servidor y una sola fila de espera.
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
                            <Label value='Prob de que haya al menos x clientes en el sistema (Pax)' />
                            <TextInput
                                type='text'
                                placeholder='Ingrese el valor de x (número entero)'
                                id='pax'
                                value={formData.pax}
                                onChange={handleChange}
                                color={validity.pax ? 'success' : 'failure'}
                            />
                        </div>
                        <div>
                            <Label value='Prob. de que haya al menos n clientes en el sistema (Pn)' />
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
                            Resultados
                        </h3>
                        <div className="flex flex-row gap-5">
                            <p>λ (Lambda) = {lambda}</p>
                            <p>µ (Mu) = {mu}</p>
                            <p>Pax = {pax}</p>
                            <p>Pn = {pn}</p>
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
                                    { pax > 0 ? (
                                        <>
                                            Pa{pax} = {resultados.paxResult}%
                                        </>
                                    ) : (
                                        <>
                                            Pax no solicitado.
                                        </>
                                    )}
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
                    </div>
                )
            }
        </div>
    )
}
