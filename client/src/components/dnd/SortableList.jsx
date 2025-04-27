import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
  } from '@dnd-kit/core';
  import {
    SortableContext,
    verticalListSortingStrategy,
  } from '@dnd-kit/sortable';
  import { sortableKeyboardCoordinates } from '@dnd-kit/sortable'; // Importación faltante
  
  const SortableList = ({ 
    items, 
    onDragEnd, 
    children 
  }) => {
    const sensors = useSensors(
      useSensor(PointerSensor, {
        activationConstraint: {
          distance: 1, // Requiere movimiento mínimo para iniciar arrastre
        },
        // Ignorar elementos interactivos
        onStart: (event) => {
          const { target } = event;
          if (target.closest("button")) { // Si el clic es en un botón
            return false; // No iniciar arrastre
          }
          return true;
        },
      }),
      useSensor(KeyboardSensor, {
        coordinateGetter: sortableKeyboardCoordinates,
      })
    );
  
    return (
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={onDragEnd}
      >
        <SortableContext 
          items={items}
          strategy={verticalListSortingStrategy}
        >
          {children}
        </SortableContext>
      </DndContext>
    );
  };
  
  export default SortableList;