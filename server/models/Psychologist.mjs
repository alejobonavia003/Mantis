import { DataTypes } from "sequelize";
import sequelize from "../config/db.mjs";

const Psychologist = sequelize.define('Psychologist', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  foto: {
    type: DataTypes.TEXT,
    validate: {
      isUrl: true
    }
  },
  nombre: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  oficio: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  especializacion: {
    type: DataTypes.STRING(255),
    allowNull: false // Campo obligatorio
  },
  telefono: {
    type: DataTypes.STRING(200)
  },
  email: {
    type: DataTypes.STRING(255),
  },
  descripcionCorta: {
    type: DataTypes.TEXT,
    allowNull: false,
    field: 'descripcion_corta'
  },
  descripcionLarga: {
    type: DataTypes.TEXT,
    allowNull: false,
    field: 'descripcion_larga'
  },
  disponibilidad: {
    type: DataTypes.JSONB,
    defaultValue: {}
  },
  formaciones: {
    type: DataTypes.JSONB,
    defaultValue: []
  },
  areasAyuda: {
    type: DataTypes.JSONB,
    defaultValue: [],
    field: 'areas_ayuda'
  },
  reseñas: {
    type: DataTypes.JSONB,
    defaultValue: []
  },
  slug: {
    type: DataTypes.STRING(255),
    unique: true,
    allowNull: false
  }
}, {
  tableName: 'psychologists',
  timestamps: true,
  underscored: true,
  hooks: {
    beforeValidate: (psychologist) => {
      // Generar slug automáticamente si no se provee
      if (!psychologist.slug) {
        const baseSlug = `${psychologist.nombre.toLowerCase().replace(/\s+/g, '-')}-${psychologist.oficio.toLowerCase().replace(/\s+/g, '-')}`;
        psychologist.slug = baseSlug + '-' + Math.random().toString(36).substr(2, 5);
      }
    }
  }
});

export default Psychologist;