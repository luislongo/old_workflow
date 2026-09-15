import { useEffect, useState } from "react";
import {
  Button,
  Caption,
  DoubleColumn,
  FormGroup,
  H1,
  Label,
  Radio,
  Subtitle,
} from "@luislongo/ds-core";
import type { TipoEmpreendimento } from "../../../types/empreendimento";

type ScreenSize = "desktop" | "mobile";

interface FormState {
  nome: string;
  email: string;
  cep: string;
  endereco: string;
  proprietario: string;
  tipo: TipoEmpreendimento | "";
}

interface FormErrors {
  nome?: string;
  email?: string;
  tipo?: string;
}

const INITIAL_FORM: FormState = {
  nome: "",
  email: "",
  cep: "",
  endereco: "",
  proprietario: "",
  tipo: "",
};

const TIPOS: TipoEmpreendimento[] = ["Residencial", "Comercial", "Infraestrutura"];

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function useSize(): ScreenSize {
  const [size, setSize] = useState<ScreenSize>(() =>
    window.innerWidth >= 1024 ? "desktop" : "mobile"
  );

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const handler = (e: MediaQueryListEvent) =>
      setSize(e.matches ? "desktop" : "mobile");
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return size;
}

export function AdicionarEmpreendimento() {
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const size = useSize();

  function handleTextChange(field: keyof FormState) {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
      if (errors[field as keyof FormErrors]) {
        setErrors((prev) => ({ ...prev, [field]: undefined }));
      }
    };
  }

  function handleTipoChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm((prev) => ({ ...prev, tipo: e.target.value as TipoEmpreendimento }));
    if (errors.tipo) {
      setErrors((prev) => ({ ...prev, tipo: undefined }));
    }
  }

  function validate(): FormErrors {
    const errs: FormErrors = {};
    if (!form.nome.trim()) {
      errs.nome = "Nome do empreendimento é obrigatório";
    }
    if (!form.email.trim()) {
      errs.email = "Endereço de e-mail é obrigatório";
    } else if (!isValidEmail(form.email)) {
      errs.email = "Endereço de e-mail inválido";
    }
    if (!form.tipo) {
      errs.tipo = "Selecione um tipo de empreendimento";
    }
    return errs;
  }

  function reset() {
    setForm(INITIAL_FORM);
    setErrors({});
  }

  function handleConfirm() {
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    alert("Empreendimento cadastrado com sucesso!");
    reset();
  }

  return (
    <div className="flex flex-col flex-1 max-w-[800px] w-full">
      <div>
        <H1>Adicionar empreendimento vazio</H1>
        <Subtitle className="mt-200 mb-600 text-neutral-400">
          Preencha as informações necessárias para cadastrar o empreendimento
        </Subtitle>

        <DoubleColumn
          size={size}
          slotLeft={
            <div className="flex flex-col gap-400 w-full">
              <FormGroup
                label="Nome do empreendimento"
                error={errors.nome}
                value={form.nome}
                onChange={handleTextChange("nome")}
                placeholder="Placeholder..."
              />
              <FormGroup
                label="Endereço de e-mail"
                error={errors.email}
                value={form.email}
                onChange={handleTextChange("email")}
                placeholder="Placeholder..."
              />
              <FormGroup
                label="CEP"
                value={form.cep}
                onChange={handleTextChange("cep")}
                placeholder="Placeholder..."
              />
              <FormGroup
                label="Endereço"
                value={form.endereco}
                onChange={handleTextChange("endereco")}
                placeholder="Placeholder..."
              />
              <FormGroup
                label="Proprietário"
                value={form.proprietario}
                onChange={handleTextChange("proprietario")}
                placeholder="Placeholder..."
              />
            </div>
          }
          slotRight={
            <div className="flex flex-col gap-300 w-full">
              <Label className="text-neutral-600">Tipo de empreendimento</Label>
              <div
                className="flex flex-col gap-300"
                role="group"
                aria-label="Tipo de empreendimento"
              >
                {TIPOS.map((tipo) => (
                  <Label
                    key={tipo}
                    htmlFor={`tipo-${tipo}`}
                    className="flex items-center gap-200 cursor-pointer"
                  >
                    <Radio
                      id={`tipo-${tipo}`}
                      name="tipo"
                      value={tipo}
                      checked={form.tipo === tipo}
                      onChange={handleTipoChange}
                    />
                    {tipo}
                  </Label>
                ))}
              </div>
              {errors.tipo && (
                <Caption className="text-danger-500">{errors.tipo}</Caption>
              )}
            </div>
          }
        />
      </div>

      <div className="mt-auto pt-800 flex justify-end gap-400">
        <Button variant="secondary" type="button" onClick={reset}>
          Cancelar
        </Button>
        <Button variant="primary" type="button" onClick={handleConfirm}>
          Confirmar
        </Button>
      </div>
    </div>
  );
}
