
import type { MiembroPastoral } from "@/types";

const MiembroPastoralCard = (infoPastoral:MiembroPastoral) => {

    const {id, nombre, rol, descripcion, fotoUrl} = infoPastoral;
    return (
         <div id={id} className="card text-center group">
          <div
            className="max-w-12 max-h-12 bg-gradient-to-br from-church-blue to-church-gold rounded-full mx-auto mb-4 flex items-center justify-center text-white text-4xl font-bold group-hover:scale-110 transition-transform"
          >
            
            LA
          </div>
          <h3 className="text-xl font-bold text-church-deep-blue mb-1">
            {nombre}
          </h3>
          <p className="text-church-gold font-medium mb-3">{rol}</p>
          <p className="text-gray-600 text-sm">
            {descripcion}.
          </p>
        </div>
    );
}
export default MiembroPastoralCard;