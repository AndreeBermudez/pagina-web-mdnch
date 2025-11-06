import { X, UserPlus, User, Mail, Lock, Shield } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { usuarioCreateSchema, type UsuarioCreateRequest } from '../schemas/usuario.schema';
import { useUsuarioMutation } from '../hooks/useUsuarioMutation';
import { useNotifications } from '../../../../core/hooks/useNotifications';
import { useRolesQuery } from '../../roles-admin/hooks/useRolesQuery';

interface CrearUsuarioModalProps {
	isOpen: boolean;
	onClose: () => void;
}

export const CrearUsuarioModal = ({ isOpen, onClose }: CrearUsuarioModalProps) => {
	const { success, error } = useNotifications();
	const { createUsuario } = useUsuarioMutation();
	const { roles } = useRolesQuery();

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		reset,
	} = useForm<UsuarioCreateRequest>({
		resolver: zodResolver(usuarioCreateSchema),
	});

	const onSubmit = async (data: UsuarioCreateRequest) => {
		try {
			await createUsuario.mutateAsync(data);
			success('Usuario creado exitosamente');
			reset();
			onClose();
		} catch (err: any) {
			error(err.message || 'Error al crear el usuario');
		}
	};

	const handleClose = () => {
		reset();
		onClose();
	};

	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 ">
			<div className="relative w-full max-w-2xl bg-white shadow-2xl rounded-2xl max-h-[90vh] overflow-hidden">
				{/* Header */}
				<div className="flex items-center justify-between p-6 border-b bg-gradient-to-r from-blue-50 to-indigo-50 border-slate-200">
					<div className="flex items-center space-x-3">
						<div className="p-2 rounded-lg bg-blue-100">
							<UserPlus className="w-6 h-6 text-blue-600" />
						</div>
						<div>
							<h2 className="text-xl font-bold text-slate-900">Crear Nuevo Usuario</h2>
							<p className="text-sm text-slate-600">Completa los datos del usuario</p>
						</div>
					</div>
					<button
						onClick={handleClose}
						className="p-2 transition-colors rounded-lg hover:bg-white/50"
						disabled={isSubmitting}
					>
						<X className="w-5 h-5 text-slate-500" />
					</button>
				</div>

				{/* Body */}
				<div className="p-6 overflow-y-auto max-h-[calc(90vh-180px)]">
					<form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
						{/* Nombres */}
						<div>
							<label className="block mb-2 text-sm font-medium text-slate-700">
								<User className="inline w-4 h-4 mr-1" />
								Nombres <span className="text-red-500">*</span>
							</label>
							<input
								type="text"
								{...register('nombres')}
								className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
									errors.nombres ? 'border-red-300 bg-red-50' : 'border-slate-300'
								}`}
								placeholder="Ingresa los nombres"
								disabled={isSubmitting}
							/>
							{errors.nombres && (
								<p className="mt-1 text-sm text-red-600">{errors.nombres.message}</p>
							)}
						</div>

						{/* Apellidos */}
						<div>
							<label className="block mb-2 text-sm font-medium text-slate-700">
								<User className="inline w-4 h-4 mr-1" />
								Apellidos <span className="text-red-500">*</span>
							</label>
							<input
								type="text"
								{...register('apellidos')}
								className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
									errors.apellidos ? 'border-red-300 bg-red-50' : 'border-slate-300'
								}`}
								placeholder="Ingresa los apellidos"
								disabled={isSubmitting}
							/>
							{errors.apellidos && (
								<p className="mt-1 text-sm text-red-600">{errors.apellidos.message}</p>
							)}
						</div>

						{/* Username */}
						<div>
							<label className="block mb-2 text-sm font-medium text-slate-700">
								<Mail className="inline w-4 h-4 mr-1" />
								Usuario (Username) <span className="text-red-500">*</span>
							</label>
							<input
								type="text"
								{...register('username')}
								className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
									errors.username ? 'border-red-300 bg-red-50' : 'border-slate-300'
								}`}
								placeholder="ejemplo@ejemplo"
								disabled={isSubmitting}
							/>
							{errors.username && (
								<p className="mt-1 text-sm text-red-600">{errors.username.message}</p>
							)}
						</div>

						{/* Password */}
						<div>
							<label className="block mb-2 text-sm font-medium text-slate-700">
								<Lock className="inline w-4 h-4 mr-1" />
								Contraseña <span className="text-red-500">*</span>
							</label>
							<input
								type="password"
								{...register('password')}
								className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
									errors.password ? 'border-red-300 bg-red-50' : 'border-slate-300'
								}`}
								placeholder="Mínimo 6 caracteres"
								disabled={isSubmitting}
							/>
							{errors.password && (
								<p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
							)}
							<p className="mt-1 text-xs text-slate-500">
								La contraseña debe tener al menos 6 caracteres
							</p>
						</div>

						{/* Rol */}
						<div>
							<label className="block mb-2 text-sm font-medium text-slate-700">
								<Shield className="inline w-4 h-4 mr-1" />
								Rol <span className="text-red-500">*</span>
							</label>
							<select
								{...register('rol')}
								className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
									errors.rol ? 'border-red-300 bg-red-50' : 'border-slate-300'
								}`}
								disabled={isSubmitting}
							>
								<option value="">Selecciona un rol</option>
								{roles.map((rol) => (
									<option key={rol.nombre} value={rol.nombre}>
										{rol.nombre}
									</option>
								))}
							</select>
							{errors.rol && (
								<p className="mt-1 text-sm text-red-600">{errors.rol.message}</p>
							)}
						</div>

						{/* Footer con botones */}
						<div className="flex items-center justify-end pt-4 space-x-3 border-t border-slate-200">
							<button
								type="button"
								onClick={handleClose}
								className="px-4 py-2.5 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
								disabled={isSubmitting}
							>
								Cancelar
							</button>
							<button
								type="submit"
								className="px-4 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
								disabled={isSubmitting}
							>
								{isSubmitting ? (
									<>
										<div className="w-4 h-4 border-2 border-white rounded-full border-t-transparent animate-spin" />
										<span>Creando...</span>
									</>
								) : (
									<>
										<UserPlus className="w-4 h-4" />
										<span>Crear Usuario</span>
									</>
								)}
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};
