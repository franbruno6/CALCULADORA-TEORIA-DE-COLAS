import { Label, Select } from 'flowbite-react';
import { Link } from 'react-router-dom';

export default function Home() {
    return (
        <div className="min-h-screen mt-20">
            <div className="flex flex-col p-3 max-w-3xl mx-auto md:items-center">
                <h1 className="font-bold dark:text-white text-4xl px-2 py-1">Calculadora Teoria de Colas</h1>
                <div className="">
                    <form action="">
                        <div className="text-md mt-5">
                            <Label value='Seleccione el modelo' /> 
                        </div>
                        <Select id='modelo' required>
                            <option value="1">M/M/1</option>
                            <option value="2">M/M/1/N</option>
                            <option value="3">M/M/2</option>
                        </Select>
                    </form>
                </div>
            </div>
            

        </div>
    )
}
