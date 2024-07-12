import { Alert, Button, Label, TextInput } from "flowbite-react";
import { useState } from "react";

export default function MM1() {
    const [errorMessage, setErrorMessage] = useState(null);
    const [arribos, setArribos] = useState('');
    const [servicio, setServicio] = useState('');
    const [pax, setPax] = useState('');
    const [pn, setPn] = useState('');
    const [formData, setFormData] = useState({});
    const [validity, setValidity] = useState({
        arribos: true,
        servicio: true,
        pax: true,
        pn: true,
    });

        const handleChange = (e) => {
        const { id, value } = e.target;
        let isValid = true;

        // Validación según el campo
        switch (id) {
            case 'arribos':
                isValid = /^\d*\.?\d*$/.test(value);
                break;
            case 'servicio':
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

        if (!formData.arribos || !formData.servicio) {
            return setErrorMessage('Complete los campos requeridos (*)');
        }

        if (validity.arribos && validity.servicio && validity.pax && validity.pn) {
            
            console.log('Formulario válido. Realizar cálculos.');
        } else {
            return setErrorMessage('Corrija los campos inválidos');
        }
    };
    
    return (
        <div className='min-h-screen mt-20'>
            <div  className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5'>
                {/* left side */}
                <div className='flex-1'>
                    <h2>
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
                                id='arribos'
                                value= {formData.arribos}
                                onChange={handleChange}
                                color={validity.arribos ? 'success' : 'failure'}
                                />
                        </div>
                        <div>
                            <Label value='Tiempo de servicio (µ)*' />
                            <TextInput
                                type='text'
                                placeholder='Ingrese el tiempo de servicio'
                                id='servicio'
                                value= {formData.servicio}
                                onChange={handleChange}
                                color={validity.servicio ? 'success' : 'failure'}
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
        </div>
    )
}
