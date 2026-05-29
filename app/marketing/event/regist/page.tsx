"use client";

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { rules } from '@/lib/validate';
import { useRouter } from 'next/navigation';
import { SButton } from '@dmsej108/design-system';

import FormTitle from '@/components/ui/FormTitle';
import DefaultForm from './DefaultForm';
import FunctionForm from './FunctionForm';
import BenefitForm from './BenefitForm';

export default function EventRegist() {
    const router = useRouter();
    const schema = yup.object().shape({
        // 기본 정보 (DefaultForm)
        eventName: rules.create('이벤트 제목').required(),
        eventType: rules.create('이벤트 유형').required(),
        eventStatus: rules.create('게시여부').required(),
        eventTarget: rules.create('이벤트 대상').required(),
        eventStartDate: yup.string().optional(), // UI 필수 표시, 입력 컴포넌트 추가 전
        eventEndDate: yup.string().optional(),
        winnerAnnouncementDate: yup.string().optional(),
        benefitType: rules.create('혜택 구분').required(),
        useType: rules.create('참여제한').required(),
        marketingPushAgreement: yup.boolean().optional(), // UI 필수 아님 (설정 옵션)
        agreementList: yup.array().optional(),
        eventBanner: yup.mixed().nullable().optional(), // UI 필수 아님
        eventBannerDescription: yup.string().optional(),
        // 기능 설정 (FunctionForm)
        buttonEvent: rules.create('버튼 이벤트').required(),
        buttonName: rules.create('버튼 명').required(),
        externalLink: yup.string().when('buttonEvent', {
            is: 'after_link',
            then: (s) => s.required('외부 링크은(는) 필수값입니다.').label('외부 링크'),
            otherwise: (s) => s.optional(),
        }),
        // 혜택 정보 (BenefitForm)
        fcfsUse: rules.create('선착순 설정').required(),
        numberOfParticipants: yup.string().when('fcfsUse', {
            is: '1',
            then: (s) => s.required('선착순 인원 설정은(는) 필수값입니다.').label('선착순 인원 설정'),
            otherwise: (s) => s.optional(),
        }),
        benefitList: rules.create('지급 혜택').required(),
        benefitAmount: rules.create('지급 혜택').required(),
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
            eventType: 'general',
            eventStatus: 'published',
            eventTarget: 'all',
            benefitType: 'immediate',
            useType: 'no_limit',
            marketingPushAgreement: true,
            agreementList: [],
            eventBanner: null,
            eventBannerDescription: '',
            buttonEvent: 'after_message',
            buttonName: '',
            externalLink: '',
            fcfsUse: '1',
            numberOfParticipants: '',
            benefitList: '1',
            benefitAmount: '',
        },
    });

    const setFileList = (files: File[] | ((prev: File[]) => File[])) => {
        const currentFiles = (getValues('eventBanner') as File[] | null | undefined) ?? [];
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
                <DefaultForm register={register} errors={errors} watch={watch} setValue={setValue} setFileList={setFileList} />

                <FormTitle title="기능 설정" style={{ marginTop: '20px' }} />
                <FunctionForm register={register} errors={errors} watch={watch} setValue={setValue} />

                <FormTitle title="혜택 정보" style={{ marginTop: '20px' }} />
                <BenefitForm register={register} errors={errors} watch={watch} setValue={setValue} />
            </div>
            <div className="btn-bottom-set flex justify-center">
                <SButton variant="outline" size="large" className="mr-10" onClick={() => router.back()}>취소</SButton>
                <SButton variant="primary" size="large" type="submit">저장</SButton>
            </div>
        </form>
    );
}
