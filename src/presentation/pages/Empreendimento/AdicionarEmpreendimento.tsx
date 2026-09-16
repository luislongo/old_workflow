import { useState } from "react";
import { Radio, Textbox } from "@luislongo/ds-core";
import type { TipoEmpreendimento } from "../../../types/empreendimento";

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

export function AdicionarEmpreendimento() {
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [errors, setErrors] = useState<FormErrors>({});

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
        <h1 className="text-2xl font-semibold text-neutral-900">
          Adicionar empreendimento vazio
        </h1>
        <p className="text-sm text-neutral-500 mt-200 mb-800">
          Preencha as informações necessárias para cadastrar o empreendimento
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-800">
          <div className="flex flex-col gap-400">
            <div>
              <label
                htmlFor="nome"
                className="block text-sm text-neutral-700 mb-100"
              >
                Nome do empreendimento
              </label>
              <Textbox
                id="nome"
                value={form.nome}
                onChange={handleTextChange("nome")}
                placeholder="Placeholder..."
                hasError={!!errors.nome}
              />
              {errors.nome && (
                <p className="text-danger-600 text-xs mt-100">{errors.nome}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm text-neutral-700 mb-100"
              >
                Endereço de e-mail
              </label>
              <Textbox
                id="email"
                value={form.email}
                onChange={handleTextChange("email")}
                placeholder="Placeholder..."
                hasError={!!errors.email}
              />
              {errors.email && (
                <p className="text-danger-600 text-xs mt-100">{errors.email}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="cep"
                className="block text-sm text-neutral-700 mb-100"
              >
                CEP
              </label>
              <Textbox
                id="cep"
                value={form.cep}
                onChange={handleTextChange("cep")}
                placeholder="Placeholder..."
              />
            </div>

            <div>
              <label
                htmlFor="endereco"
                className="block text-sm text-neutral-700 mb-100"
              >
                Endereço
              </label>
              <Textbox
                id="endereco"
                value={form.endereco}
                onChange={handleTextChange("endereco")}
                placeholder="Placeholder..."
              />
            </div>

            <div>
              <label
                htmlFor="proprietario"
                className="block text-sm text-neutral-700 mb-100"
              >
                Proprietário
              </label>
              <Textbox
                id="proprietario"
                value={form.proprietario}
                onChange={handleTextChange("proprietario")}
                placeholder="Placeholder..."
              />
            </div>
          </div>

          <div className="mt-800 lg:mt-0">
            <fieldset>
              <legend className="text-sm text-neutral-700 mb-300">
                Tipo de empreendimento
              </legend>
              <div className="flex flex-col gap-200">
                {TIPOS.map((tipo) => (
                  <label
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
                    <span className="text-sm text-neutral-700">{tipo}</span>
                  </label>
                ))}
              </div>
              {errors.tipo && (
                <p className="text-danger-600 text-xs mt-200">{errors.tipo}</p>
              )}
            </fieldset>
          </div>
        </div>
      </div>

      <div className="mt-auto pt-800 flex justify-end gap-400">
        <button
          type="button"
          onClick={reset}
          className="px-600 py-300 border border-neutral-300 rounded-100 text-sm text-neutral-700 font-medium hover:bg-neutral-50 cursor-pointer"
        >
          Cancelar
        </button>
        <button
          type="button"
          onClick={handleConfirm}
          className="px-600 py-300 bg-primary-500 text-white rounded-100 text-sm font-medium hover:bg-primary-400 cursor-pointer"
        >
          Confirmar
        </button>
      </div>
    </div>
  );
}
