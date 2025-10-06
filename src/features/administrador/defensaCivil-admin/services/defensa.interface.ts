export interface DefensaCivil {
	defensaCivilId: number;
	titulo: string;
	descripcion: string;
	rutaPdf: string;
	numeroSerenazgo: string;
	numeroSalud: string;
	numeroBomberos: string;
	fechaCreacion?: string;
	fechaModificacion?: string;
}

export interface DefensaCivilFormData {
	titulo: string;
	descripcion: string;
	rutaPdf?: File | null;
	numeroSerenazgo: string;
	numeroSalud: string;
	numeroBomberos: string;
}

export interface DefensaCivilRequest extends DefensaCivilFormData {}

export interface DefensaCivilResponse extends DefensaCivil {}

export interface DefensaCivilUpdateData extends DefensaCivilFormData {}