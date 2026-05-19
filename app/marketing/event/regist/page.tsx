"use client";

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { rules } from '@/lib/validate';
import FormTitle from '@/components/ui/FormTitle';
import DefaultForm from './defalutform';
import FunctionForm from './functionform';
import BenefitForm from './benefitform';

export default function EventRegist() {
    const schema = yup.object().shape({
        eventName: rules.create('이벤트 제목').required(),
        eventType: rules.create('이벤트 유형').required(),
        eventStatus: rules.create('이벤트 상태').required(),
        eventTarget: rules.create('이벤트 대상').required(),
        benefitType: rules.create('혜택 유형').required(),
        useType: rules.create('사용 여부').required(),
        marketingPushAgreement: yup.boolean().required('마케팅 정보 PUSH 수신동의는 필수값입니다.'),
        agreementList: yup.array().optional(),
        eventBanner: rules.create('이벤트 배너').fileLength().required(),
    });
    type FormValues = yup.InferType<typeof schema>
    const {
        register,
        handleSubmit,
        setValue,
        watch,
        getValues,
        formState: { errors },
    } = useForm<FormValues>({
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        resolver: yupResolver(schema) as any,
        defaultValues: {
            eventType: '1',
            eventStatus: '1',
            eventTarget: '1',
            benefitType: '1',
            useType: '1',
            marketingPushAgreement: true,
            agreementList: [],
            eventBanner: [],
        },
    });

    const setFileList = (files: File[] | ((prev: File[]) => File[])) => {
        const currentFiles = getValues('eventBanner') || [];
        const newFiles = typeof files === 'function' ? files(currentFiles) : files;
        setValue('eventBanner', newFiles as File[], { shouldValidate: true });
    };

    const onSubmit = (data: FormValues) => {
        console.log(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="tbl-wrap">
                <FormTitle title="기본 정보" />
                <DefaultForm register={register} errors={errors} watch={watch} setFileList={setFileList} />

                <FormTitle title="기능 설정" style={{ marginTop: '20px' }} />
                <FunctionForm register={register} errors={errors} />

                <FormTitle title="혜택 정보" style={{ marginTop: '20px' }} />
                <BenefitForm register={register} errors={errors} />
            </div>
            <div className="btn-bottom-set flex justify-center">
                <button type="button" className="btn btn-sl nega">취소</button>
                <button type="submit" className="btn btn-sl posi">저장</button>
            </div>
        </form>
    );
}
