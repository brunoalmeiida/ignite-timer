import { HandPalm, Play } from "phosphor-react";
import { HomeContainer, StartCountdowmButton, StopCountdowmButton } from "./styles";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import { Countdown } from "./Countdown";
import { CyclesContext } from "../../../contexts/CyclesContext";
import { NewCycleForm } from "./NewCycleForm";
import { useContext } from "react";

const newCycleFormValidationSchema = zod.object({
    task: zod.string().min(1, "Informa a tarefa"),
    minutesAmount: zod
        .number()
        .min(5, "O ciclo precisa ser de no mínimo 5 minutos")
        .max(60, "O ciclo precisa ser de no máximo 60 minutos"),
})

type newCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

export function Home() {
    const { activeCycle, createNewCycle, interruptCurrentCycle} = useContext(CyclesContext);

    const newCycleForm = useForm<newCycleFormData>({
        resolver: zodResolver(newCycleFormValidationSchema),
        defaultValues: {
            task: "",
            minutesAmount: 0,
        },
    });

    const { handleSubmit, watch, reset } = newCycleForm   

    function handleCreateNewCycle(data: newCycleFormData) {
        createNewCycle(data);
        reset();
    }

    const task = watch("task");
    const isSubmitDisabled = !task;

    return (
        <HomeContainer>
            <form action="" onSubmit={handleSubmit(handleCreateNewCycle)}>                
                <FormProvider {...newCycleForm}>
                    <NewCycleForm />
                </FormProvider>
                <Countdown />                

                {activeCycle ? (
                    <StopCountdowmButton onClick={interruptCurrentCycle} type="button">
                        <HandPalm size={24} />
                        Interromper
                    </StopCountdowmButton>
                ) : (
                    <StartCountdowmButton disabled={isSubmitDisabled} type="submit">
                        <Play size={24} />
                        Começar
                </StartCountdowmButton>
                )}
            </form>
        </HomeContainer>
    )
}