import React, { useEffect, useRef, useState } from 'react';
import cl from './TemplateContent.module.scss';
import Select from 'react-select';
import { TemplateT, isPublicSelectOptions, isPublicSelectSelectStyles, recieverSelectOptions, recieverSelectSelectStyles } from '../../../../../entities/template';
import { Button, Input, InputMulti, LabelTop } from '../../../../../shared/UI';
import { targetValueInOptions, useInput, useSelect } from '../../../../../shared/lib';
import { Editor } from '@tinymce/tinymce-react';

type TemplateContentProps = {
	selectedTemplate: TemplateT | null
}

const TemplateContent = ({ selectedTemplate }:TemplateContentProps):React.JSX.Element => {
	console.log('RENDER');
	const [isPublic, setIsPublic] = useSelect(selectedTemplate ? targetValueInOptions<typeof selectedTemplate.isPublic>(selectedTemplate.isPublic, isPublicSelectOptions) : isPublicSelectOptions[0]);
	const [templateName, setTemplateNameHandler, setTemplateName] = useInput(selectedTemplate ? selectedTemplate.name : '');
	const [reciver, setReciver] = useState(selectedTemplate ? selectedTemplate.receiver : []);
	const [reciverType, setReciverType] = useState(selectedTemplate ? targetValueInOptions<typeof selectedTemplate.receiverType>(selectedTemplate.receiverType, recieverSelectOptions) : isPublicSelectOptions[0]);
	const templateBody = useRef(selectedTemplate ? selectedTemplate.body : '<p></p>');

	const setMailTextHandler = (value: string): void => {
		templateBody.current = value;
	};

	const saveTemplateHandler = () => {
		console.log(isPublic, templateName);
	};

	const setReciverHandler = (newValue: string[]) => {
		setReciver(newValue);
	};

	useEffect(() => {
		if (selectedTemplate) {
			console.log('selectedTemplate', selectedTemplate);
			const { isPublic, name, body, receiverType } = selectedTemplate;
			setIsPublic(targetValueInOptions<typeof isPublic>(isPublic, isPublicSelectOptions));
			setReciverType(targetValueInOptions<typeof receiverType>(receiverType, recieverSelectOptions));
			setTemplateName(name);
			templateBody.current = body;
		}
	}, [selectedTemplate]);
	return (
		<div className={cl['template-content']}>
			<div className={cl['template-content__row']}>
				<div className={cl['template-content__left']}>
					<LabelTop style={{ width: '100%', flex: '0 0 calc(70% - 2px)' }} label='Название шаблона' name='test' >
						<Input defaultValue={templateName} onChangeHandler={setTemplateNameHandler} type='text' id='test' />
					</LabelTop>
					<Select
						value={isPublic}
						options={isPublicSelectOptions}
						onChange={setIsPublic}
						styles={isPublicSelectSelectStyles}
					/>
				</div>
				<div className={cl['template-content__right']}>
					<LabelTop style={{ width: '100%', flex: '0 0 calc(30% - 2px)' }} label='Куда отправлять письмо' name='test'>
						<Select
							value={reciverType}
							options={recieverSelectOptions}
							onChange={setReciverType}
							styles={recieverSelectSelectStyles}
						/>
					</LabelTop>
					{
						Boolean(reciverType?.value) &&
						<InputMulti style={{ flex: '0 0 calc(70% - 2px)' }} value={reciver} onChangeHandler={setReciverHandler} placeholder='placeholder'/>
					}
				</div>
			</div>
			<div className={cl['template-content__row']}>

			</div>
			<div className={cl['template-content__editor']}>
				<Editor
					value={templateBody.current}
					apiKey={'g9tzrij970h352q9osfaj8pddqo9fjba3n9ivpt1q3572k47'}
					onEditorChange={setMailTextHandler}
					init={{
						placeholder: 'Напишите что-нибудь...',
						skin: 'oxide',
						height: 400,
						menubar: false,
						plugins: 'code',
						toolbar:
							'undo redo |' +
							'blocks fontfamily |' +
							'alignjustify aligncenter alignleft alignright |' +
							'bold italic strikethrough underline |' +
							'forecolor |' +
							'outdent indent |' +
							'subscript superscript |' +
							'removeformat code'
					}}
				/>
			</div>
			<div className={cl['template-content__files']}>

			</div>
			<div className={cl['template-content__btns']}>
				<Button type='accent' clickHandler={saveTemplateHandler} >Сохранить</Button>
			</div>
		</div>
	);
};

export default TemplateContent;
