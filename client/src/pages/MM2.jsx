import { Alert, Button, Label, TextInput } from "flowbite-react";
import { useState } from "react";

export default function MM2() {
    const [errorMessage, setErrorMessage] = useState(null);
    const [lambda, setLambda] = useState(0);
    const [mu, setMu] = useState(0);
    const [pax, setPax] = useState(0);
    const [pn, setPn] = useState(0);
    const [calculando, setCalculando] = useState(false);
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
        if (mu < lambda) {
            setCalculando(false);
            return setErrorMessage('La tasa de arribos debe ser menor o igual al tiempo de servicio');
        }

        setCalculando(true);

        if (lambda === mu) {
            return setResultados({
                rho: 1,
                p0: 0,
                lq: 'Indefinido',
                ls: 'Indefinido',
                wq: 'Indefinido',
                ws: 'Indefinido',
                pnResult: 0,
                paxResult: 0,
            });
        };
        

        const rho = lambda / mu;
        const p0 = 1 - rho;
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
        }

        if (pn > 0) {
            pnResult = (1 - (lambda / mu)) * Math.pow((lambda / mu), pn);
        }

        setResultados({
            rho: (rho * 100).toFixed(2),
            p0: (p0 * 100).toFixed(2),
            lq: lq.toFixed(2),
            ls: ls.toFixed(2),
            wq: wq.toFixed(2),
            ws: ws.toFixed(2),
            paxResult: (paxResult * 100).toFixed(2),
            pnResult: (pnResult * 100).toFixed(2),
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
        setErrorMessage(null);

        const lambda = parseFloat(formData.lambda);
        const mu = parseFloat(formData.mu);
    
        const pax = formData.pax === '' ? 0 : parseInt(formData.pax);
        const pn = formData.pn === '' ? 0 : parseInt(formData.pn);

        if (isNaN(lambda) || isNaN(mu)) {
            const newValidity = { ...validity };

            if (isNaN(mu)) {
                newValidity.mu = false;
            }
            if (isNaN(lambda)) {
                newValidity.lambda = false;
            }

            setValidity(newValidity);
            setCalculando(false);

            return setErrorMessage('Complete los campos requeridos (*) con números válidos');
        }

        if (validity.lambda && validity.mu && validity.pax && validity.pn) {
            setErrorMessage(null);

            setLambda(lambda);
            setMu(mu);
            setPax(pax);
            setPn(pn);
            
            console.log('Formulario válido. Realizar cálculos.');
            calcularDatos(lambda, mu, pax, pn);
        } else {
            setCalculando(false);
            return setErrorMessage('Corrija los campos inválidos');
        }
    };
    
    return (
        <div className='min-h-screen mt-10'>
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
                                    ρ = {resultados.rho}%
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
