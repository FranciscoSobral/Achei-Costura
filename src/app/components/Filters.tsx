import React from 'react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from './ui/sheet';
import { Button } from './ui/button';
import { Label } from './ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Slider } from './ui/slider';
import { SlidersHorizontal, X } from 'lucide-react';

interface FiltersProps {
  filters: {
    category: string;
    city: string;
    minPrice: number;
    maxPrice: number;
    contractType: string;
    sortBy: string;
  };
  onFiltersChange: (filters: any) => void;
  onApply: () => void;
  onReset: () => void;
}

const categories = [
  'Todos',
  'Moda Praia',
  'Bordado',
  'Ajustes',
  'Malharia',
  'Alfaiataria',
  'Reparos',
  'Customização',
  'Infantil',
];

const cities = [
  'Todas',
  'São Paulo',
  'Rio de Janeiro',
  'Belo Horizonte',
  'Curitiba',
  'Porto Alegre',
  'Fortaleza',
  'Brasília',
  'Salvador',
];

const contractTypes = [
  { value: 'all', label: 'Todos' },
  { value: 'Freela', label: 'Freela' },
  { value: 'PJ', label: 'PJ' },
  { value: 'CLT', label: 'CLT' },
];

const sortOptions = [
  { value: 'recent', label: 'Mais recentes' },
  { value: 'price', label: 'Maior valor' },
  { value: 'nearby', label: 'Mais próximos' },
];

export const Filters = ({ filters, onFiltersChange, onApply, onReset }: FiltersProps) => {
  const [open, setOpen] = React.useState(false);

  const handleApply = () => {
    onApply();
    setOpen(false);
  };

  const handleReset = () => {
    onReset();
    setOpen(false);
  };

  const activeFiltersCount = [
    filters.category !== 'all',
    filters.city !== 'all',
    filters.contractType !== 'all',
    filters.maxPrice > 0,
  ].filter(Boolean).length;

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" className="relative">
          <SlidersHorizontal className="w-4 h-4 mr-2" />
          Filtros
          {activeFiltersCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-purple-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {activeFiltersCount}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Filtros</SheetTitle>
          <SheetDescription>
            Refine sua busca por serviços de costura
          </SheetDescription>
        </SheetHeader>

        <div className="py-6 space-y-6">
          {/* Ordenação */}
          <div className="space-y-2">
            <Label>Ordenar por</Label>
            <Select
              value={filters.sortBy}
              onValueChange={(value) =>
                onFiltersChange({ ...filters, sortBy: value })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {sortOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Categoria */}
          <div className="space-y-2">
            <Label>Categoria</Label>
            <Select
              value={filters.category}
              onValueChange={(value) =>
                onFiltersChange({ ...filters, category: value })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas</SelectItem>
                {categories.filter(c => c !== 'Todos').map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Cidade */}
          <div className="space-y-2">
            <Label>Cidade</Label>
            <Select
              value={filters.city}
              onValueChange={(value) =>
                onFiltersChange({ ...filters, city: value })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas</SelectItem>
                {cities.filter(c => c !== 'Todas').map((city) => (
                  <SelectItem key={city} value={city}>
                    {city}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Tipo de Contrato */}
          <div className="space-y-2">
            <Label>Tipo de Contrato</Label>
            <Select
              value={filters.contractType}
              onValueChange={(value) =>
                onFiltersChange({ ...filters, contractType: value })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {contractTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Faixa de Preço */}
          <div className="space-y-4">
            <Label>Faixa de Preço</Label>
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Min: R$ {filters.minPrice}</span>
                <span>
                  Max: {filters.maxPrice > 0 ? `R$ ${filters.maxPrice}` : 'Sem limite'}
                </span>
              </div>
              <div className="space-y-3">
                <div>
                  <Label className="text-xs">Mínimo</Label>
                  <Slider
                    min={0}
                    max={5000}
                    step={100}
                    value={[filters.minPrice]}
                    onValueChange={(value) =>
                      onFiltersChange({ ...filters, minPrice: value[0] })
                    }
                  />
                </div>
                <div>
                  <Label className="text-xs">Máximo</Label>
                  <Slider
                    min={0}
                    max={5000}
                    step={100}
                    value={[filters.maxPrice]}
                    onValueChange={(value) =>
                      onFiltersChange({ ...filters, maxPrice: value[0] })
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <SheetFooter className="gap-2">
          <Button variant="outline" onClick={handleReset} className="flex-1">
            <X className="w-4 h-4 mr-2" />
            Limpar
          </Button>
          <Button onClick={handleApply} className="flex-1">
            Aplicar
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
