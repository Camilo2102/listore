import useDeepCopy from "@/app/hooks/useDeepCopy";
import FormControl from "./formControl";

/**
 * Clase encargada del manejo de los forms
 */
export default class Form {
    /**
     * Atributos
     */
    private formControls: FormControl[];
    private initialFormControls: FormControl[];
    private valid: boolean = true;

    constructor(formControl: FormControl[]) {
        this.formControls = formControl;
    }

    /**
     * Valida que el formulario cuente con formcontrols para generar un key value lo genera a partir del field y del value
     * @returns devolver un objeto clave: valor {key: value}, para poder ser usado en el useState 
     */
    
    public getFormControlValues(): any {
        if (!this.withFormControls()) return;
        return this.formControls.reduce((acc, control) => {
            acc[control.field] = control.value;
            return acc;
        }, {} as any);
    }

    /**
     * Toma los formcontrols y valida con los validadores del formcontrol que este correctamente 
     * @returns los controles modificados con los estados del form y las clases en caso de que falte un campo
     */
    public validateForm(): FormControl[] {
        this.valid = true;
        this.formControls.forEach(form => {
            form.invalid = form.validators ? form.validators.some(validator => validator(form)) : false;

            if (form.invalid) {
                this.valid = false;
            }
        })
        return this.formControls;
    }

    /**
     * 
     * @param field 
     */
    public enableField(field: string): void{
        this.formControls.forEach(control => {
            if(control.field === field){
                control.disabled = false;
            }
        })
    }

    public updateFilter(field:string, value: any){
        this.formControls.forEach(control => {
            if(control.field === field){
                control.filter = {values: [], required: {...control.filter?.required, ...value}}                
            }
        })
    }
    

    /**
     * se encarga de tomar los valores que tenga dentro del useState para ponerlos como valores en los fromcontrols, es decir poner el valor en el fromcontroll
     * @param values los valores a parchar dentro de los formcontrols
     */
    public pathValue(values: any) {
        this.formControls.forEach(control => {
            if (values.hasOwnProperty(control.field)) {
                control.value = values[control.field];
            }
        });
    }

    /**
     * 
     * @returns Regresa el estado del formulario
     */
    public isValid() {
        return this.valid;
    }

    /**
     * Se encarga que al hacer un nuevo input(sin estar validando) se resetee el status para que limpie es estado invalido
     * @param field 
     */
    public resetStatus(field: string) {
        this.formControls.forEach(control => {
            if (control.field === field) {
                control.invalid = false;
            }
        });
    }

    /**
     * Valida que se tengan formcontrols en el formulario
     * @returns si hay formcontrols en el sistema
     */
    private withFormControls(): boolean {
        return this.formControls.length > 0;
    }

    /**
     * 
     * @returns Regresa los fromcontrols
     */
    public getFormControls(): FormControl[] {
        return this.formControls;
    }

}