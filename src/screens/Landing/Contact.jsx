import React from 'react'
import * as AntdComponent from 'antd';
import CustomInput from 'components/CustomInput';
import CustomTextArea from 'components/CustomTextArea';
import CustomAvatar from 'components/CustomAvatar';
import { StaticImages } from 'utils/StaticImages';
import CustomButton from 'components/CustomButton';
import useCustomMutation from 'Hook/useCustomMutation';
import { MutateKeys } from 'Constant/TanKeys';
import { COMMON } from 'utils/EndPoint';
import { METHODS } from 'Constant/variable';
import CustomToast from 'utils/CustomToast';
import { Link } from 'react-router-dom';
import { RouterKeys } from 'routes/RouterKey';

const Contact = () => {
    const [contactForm] = AntdComponent.Form.useForm();

    const [checked, setChecked] = React.useState(false);


    //CONTACT US API
    const { mutate: handleContact, isPending2 } = useCustomMutation({
        mutationKey: [MutateKeys.CONTACT_US],
    });
    // HandleContactUs function
    const handleContactUs = (values) => {
        CustomToast('s', 'Thanks for reaching out! We’ll be in touch as soon as possible.')
        const verifyRequestData = {
            myObj: {
                name: values.name,
                message: values.message,
                email: values.email?.toLowerCase()?.trim(),
            },
            url: COMMON.COMMON.CONTACT_US,
            method: METHODS.POST,
        };
        contactForm.resetFields();
        console.log('handleContact', handleContact, verifyRequestData)
        // handleContact(verifyRequestData);
    };

    return (
        <div className='common_container mt-12 bg-Violet-100 grid rounded-xl p-4'>
            <AntdComponent.Row gutter={[16, 16]} className="px-5 gap-2 flex justify-center  ">
                {/* Information Part */}
                <AntdComponent.Col xs={24} md={24} lg={11} xl={11} className=" md:h-full bg-white rounded-xl p-4">
                    <div className='flex flex-col justify-end'>
                        <p className='titleLarge font-medium'>Contact <span className='text-Blue-100 titleLarge font-bold italic'>Us</span></p>
                        <p className='titleSmall mt-2'>Get in Touch</p>
                        <p className='titleSmall mb-5'>Have questions, ideas, or partnership inquiries? <br/>
                            We’d love to hear from you..</p>


                    </div>
                    <div className='mt-5'>
                       
                        <p className='my-2'>Email: support@quikygram.com</p>
                        <a href='mailto:Contactus@Quikygram.com' className='bg-gradient-to-r from-Blue-200 to-Blue-100 bg-clip-text text-transparent titleSmall'>Social: @QuikyGram on all platforms</a>
                    </div>
                </AntdComponent.Col>

                {/* Form */}
                <AntdComponent.Col xs={24} md={24} lg={12} xl={12} className=''>

                    <AntdComponent.Form layout="vertical" requiredMark={false} variant='borderless' onFinish={handleContactUs} form={contactForm}>

                        <AntdComponent.Form.Item name="name" rules={[{ required: true, message: "Please enter your name!", },]} >
                            <CustomInput placeholder="Name*" className='h-14 border-none placeholder-black' />
                        </AntdComponent.Form.Item>

                        <AntdComponent.Form.Item name="email" rules={[{ type: 'email', required: true, message: "Please enter your email!", },]} >
                            <CustomInput placeholder="Email*" className='h-14 border-none placeholder-black' />
                        </AntdComponent.Form.Item>

                        <AntdComponent.Form.Item name="phone" rules={[{ type: 'phone', required: true, message: "Please enter your phone number!", },]} >
                            <CustomInput placeholder="Phone*" className='h-14 border-none placeholder-black' />
                        </AntdComponent.Form.Item>

                        <AntdComponent.Form.Item name="message" rules={[{ required: true },]} >
                            <CustomTextArea rows={3} placeholder="Other notes" className='resize-none border-none placeholder-black' />
                        </AntdComponent.Form.Item>

                        <div className='flex justify-start items-start gap-2'>
                            <CustomAvatar shape='square' onClick={() => { setChecked(!checked) }} src={checked ? StaticImages.CHECKBOX.check : StaticImages.CHECKBOX.unCheck} alt="Checkbox" className='cursor-pointer min-h-7 min-w-7 h-7 w-7 mt-2 ' />
                            <h1>Sign up for our email list for updates, promotions, and more.</h1>
                        </div>

                        <AntdComponent.Form.Item rules={[{}]}>
                            <h1 className="text-title20 w-auto">
                                This site is protected by reCAPTCHA and the Google{" "}
                                <Link
                                    to={RouterKeys.COMMON.PRIVACY}
                                    className="bg-gradient-to-r from-Blue-200 to-Blue-100 bg-clip-text text-transparent"
                                >
                                    Privacy Policy
                                </Link>{" "}
                                and{" "}
                                <Link
                                    to={RouterKeys.COMMON.TermsAndConditions}
                                    className="bg-gradient-to-r from-Blue-200 to-Blue-100 bg-clip-text text-transparent"
                                >
                                    Terms of Service
                                </Link>{" "}
                                apply.
                            </h1>
                        </AntdComponent.Form.Item>




                        <div className="mt-5">
                            <CustomButton disabled={!checked} htmlType="submit" className=" commonButton" loading={isPending2}>Send</CustomButton>
                        </div>
                    </AntdComponent.Form>

                </AntdComponent.Col>
            </AntdComponent.Row>
        </div>
    )
}

export default Contact