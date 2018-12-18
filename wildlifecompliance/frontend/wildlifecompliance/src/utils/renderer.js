import Section from '../components/forms/section.vue'
import Group from '../components/forms/group.vue'
import Radio from '../components/forms/radio.vue'
import Conditions from '../components/forms/conditions.vue'
import SelectConditions from '../components/forms/select-conditions.vue'
import Checkbox from '../components/forms/checkbox.vue'
import Declaration from '../components/forms/declarations.vue'
import File from '../components/forms/file.vue'
import Select from '../components/forms/select.vue'
import DateField from '../components/forms/date-field.vue'
import TextField from '../components/forms/text.vue'
import TextArea from '../components/forms/text-area.vue'
import Label from '../components/forms/label.vue'
import AssessorText from '../components/forms/readonly_text.vue'
import HelpText from '../components/forms/help_text.vue'
import HelpTextUrl from '../components/forms/help_text_url.vue'
import CommentRadioCheckBox from '../components/forms/comment_icon_checkbox_radio.vue'
import {helpers,api_endpoints} from "@/utils/hooks.js"

module.exports = {
    renderChildren(h,c,data=null,assessorData=null,_readonly) {
        var is_readonly = this.status_data.readonly;
        var assessorStatus = this.status_data.assessorStatus;
        var assessorData = this.status_data.assessorData;
        var commentData = this.status_data.commentData;
        var assessorInfo = this.status_data.assessorInfo;
		var applicationId = this.status_data.applicationId;
        var assessorMode = false; 
        var assessorCanAssess = false; 
        var assessorLevel = '';
        var readonly = false;
        var _elements = [];

        if (assessorStatus != null){
            assessorMode = assessorStatus['assessor_mode'];
            assessorCanAssess = assessorStatus['has_assessor_mode'];
            assessorLevel = assessorStatus['assessor_level'];
        }

        var site_url = (api_endpoints.site_url.endsWith("/")) ? (api_endpoints.site_url): (api_endpoints.site_url + "/");

        // Visibility 
        var visibility = this.getVisibility(h,c,is_readonly,assessorMode,assessorCanAssess)
        if (!visibility.visible){ return "" }
        var assessor_visibility = assessorLevel == 'assessor' && this.status_data.assessorStatus.has_assessor_mode? true : false;
        assessor_visibility = !assessor_visibility;

        // Editablility
        readonly = !visibility.editable;

        var val = (data) ? (data[c.name]) ? data[c.name] : null : null;
        var comment_val = (commentData) ? (commentData[c.name]) ? commentData[c.name] : null : null;

        if (c && c.help_text && c.help_text.indexOf("site_url:/") >= 0) {
            var help_text = c.help_text.replace('site_url:/', site_url);
            if (help_text.indexOf("anchor=") >= 0) {
                help_text = help_text.replace('anchor=', "#");
            }
        } else {
            var help_text = c.help_text;
        }

        if (c && c.help_text_assessor && c.help_text_assessor.indexOf("site_url:/") >= 0) {
            var help_text_assessor = c.help_text_assessor.replace('site_url:/', site_url);
            if (help_text_assessor.indexOf("anchor=") >= 0) {
                help_text_assessor = help_text_assessor.replace('anchor=', "#");
            }
        } else {
            var help_text_assessor = c.help_text_assessor;
        }

        // repeat for help_text_url
        if (c && c.help_text_url && c.help_text_url.indexOf("site_url:/") >= 0) {
            var help_text_url = c.help_text_url.replace('site_url:/', site_url);
            if (help_text_url.indexOf("anchor=") >= 0) {
                help_text_url = help_text_url.replace('anchor=', "#");
            }
        } else {
            var help_text_url = c.help_text_url;
        }

        if (c && c.help_text_assessor_url && c.help_text_assessor_url.indexOf("site_url:/") >= 0) {
            var help_text_assessor_url = c.help_text_assessor_url.replace('site_url:/', site_url);
            if (help_text_assessor_url.indexOf("anchor=") >= 0) {
                help_text_assessor_url = help_text_assessor_url.replace('anchor=', "#");
            }
        } else {
            var help_text_assessor_url = c.help_text_assessor_url;
        }

        var id = 'id_' + c.name;
        var id1 = id + '_1'
        var id2 = id + '_2'
        var id3 = id + '_3'
        console.log(c.type);
        switch (c.type) {
            case 'text':
				readonly = (c.readonly) ? (c.readonly): (readonly);
                _elements.push(
                    <TextField type="text" name={c.name} value={val} id={id} comment_value={comment_val} label={c.label} help_text={help_text} help_text_assessor={help_text_assessor} assessorMode={assessorMode} readonly={readonly} assessor_readonly={assessor_visibility} isRequired={c.isRequired} help_text_url={help_text_url} help_text_assessor_url={help_text_assessor_url}/>
                )
                break;
            case 'number':
                _elements.push(
					<TextField type="number" name={c.name} value={val} id={id} min={c.min} max={c.max} comment_value={comment_val} label={c.label} help_text={help_text} help_text_assessor={help_text_assessor} assessorMode={assessorMode} readonly={readonly} assessor_readonly={assessor_visibility} isRequired={c.isRequired} help_text_url={help_text_url} help_text_assessor_url={help_text_assessor_url}/>
                )
                break;
            case 'email':
                _elements.push(
					<TextField type="email" name={c.name} value={val} id={id} comment_value={comment_val} label={c.label} help_text={help_text} help_text_assessor={help_text_assessor} assessorMode={assessorMode} readonly={readonly} assessor_readonly={assessor_visibility} isRequired={c.isRequired} help_text_url={help_text_url} help_text_assessor_url={help_text_assessor_url}/>
                )
                break;
            case 'select':
                var value = null;
                if(data !== null && data !== undefined) {
                  value = ( data )? data : null ;
                }
                _elements.push(
                    <div>
                        <Select readonly={readonly} name={c.name} label={c.label} value={c.value} id={id} comment_value={comment_val} options={c.options} help_text={help_text} help_text_assessor={help_text_assessor} value={val} handleChange={this.selectionChanged}  conditions={c.conditions} assessorMode={assessorMode} assessor_readonly={assessor_visibility} isRequired={c.isRequired} help_text_url={help_text_url} help_text_assessor_url={help_text_assessor_url}/>
                        <SelectConditions conditions={c.conditions} renderer={this} name={c.name} data={data} id={id1} readonly={readonly} isRequired={c.isRequired}/>
                    </div>
                )
                break;
            case 'multi-select':
                _elements.push(
					<Select name={c.name} label={c.label} value={val} id={id} comment_value={comment_val} options={c.options} value={val} help_text={help_text} help_text_assessor={help_text_assessor} assessorMode={assessorMode} handleChange={this.selectionChanged} readonly={readonly} isMultiple={true} assessor_readonly={assessor_visibility} isRequired={c.isRequired} help_text_url={help_text_url} help_text_assessor_url={help_text_assessor_url}/>
                )
                break;
            case 'text_area':
                _elements.push(
					<TextArea readonly={readonly} name={c.name} value={val} id={id} comment_value={comment_val} label={c.label} help_text={help_text} assessorMode={assessorMode} assessor_readonly={assessor_visibility} isRequired={c.isRequired} help_text_url={help_text_url} help_text_assessor_url={help_text_assessor_url}/>
                )
                break;
            case 'label':
                _elements.push(
					<Label value={c.label} id={id} />
                )
                break;
            case 'radiobuttons':
            var value = null;
                if(data !== null && data !== undefined) {
                  value = ( data )? data : null ;
                }
                _elements.push(
                    <div class="form-group">
                        <label id={id} class="inline">{c.label}</label>
                            <HelpText help_text={help_text}/>
                            <HelpText help_text={help_text_assessor} assessorMode={assessorMode} isForAssessor={true}/>
                            <HelpTextUrl help_text_url={help_text_url}/>
                            <HelpTextUrl help_text_url={help_text_assessor_url} assessorMode={assessorMode} isForAssessor={true}/>
                            <CommentRadioCheckBox assessor_readonly={assessor_visibility} name={c.name} comment_value={comment_val} assessorMode={assessorMode} label={c.label}/>
                            {c.options.map(op =>{
                                return(
                                    <Radio name={c.name} label={op.label} value={op.value} isRequired={op.isRequired} id={id1} savedValue={val} handleChange={this.handleRadioChange} conditions={c.conditions} readonly={readonly}/>
                                )
                            })}
                            <Conditions conditions={c.conditions} renderer={this} name={c.name} data={data} id={id2} readonly={readonly}/>
                    </div>
                )
                break;
            case 'group':
                var value = null;
                if(data !== null && data !== undefined) {
                  value = ( data[c.name] )? data[c.name][0] : null ;
                }
                _elements.push(
					<Group label={c.label} name={c.name} id={id} help_text={help_text} help_text_url={help_text_url} isRemovable={true} isRepeatable={c.isRepeatable} renderer={this} groupObject={c}>
                        {c.children.map(c=>{
                            return (
                                <div>
                                    {this.renderChildren(h,c,value)}
                                </div>
                            )
                        })}
                    </Group>
                )
                if(c.isRepeatable){
                    _elements.push(
                        <a class="btn btn-primary">Add Another 2</a>
                    )
                }
                break;
            case 'section':
                var value = null;
                if(data !== null && data !== undefined) {
                  value = ( data[c.name] )? data[c.name][0] : null ;
                }
                this.sections.push({name:c.name,label:c.label});
                _elements.push(
                    <Section label={c.label} Key={c.name} id={c.name}>
                        {c.children.map(d=>{
                            return (
                                <div>
                                    {this.renderChildren(h,d,value)}
                                </div>
                            )
                        })}
                    </Section>
                    
                )
                break;
            case 'tab':
                var value = null;
                if(data !== null && data !== undefined) {
                  value = ( data[c.name] )? data[c.name][0] : null ;
                }
                if(this.tabs_list.length>0){
                     _elements.push(
                        <div class="tab-pane fade" id={c.id}>
                            {c.children.map(d=>{
                                return (
                                    <div>
                                        {this.renderChildren(h,d,value)}
                                    </div>
                                )
                            })}
                        </div>
                    )
                }else{
                     _elements.push(
                        <div class="tab-pane fade in active" id={c.id}>
                            {c.children.map(d=>{
                                return (
                                    <div>
                                        {this.renderChildren(h,d,value)}
                                    </div>
                                )
                            })}
                        </div>
                    )
                }
                this.tabs_list.push({name:c.name,label:c.label,id:c.id});
				break;
            case 'checkbox':
                _elements.push(
                    <div class="form-group">
						<Checkbox group={c.group} name={c.name} label={c.label} id={id1} help_text={help_text} help_text_url={help_text_url} value={val} handleChange={this.handleCheckBoxChange} conditions={c.conditions} readonly={readonly} isRequired={c.isRequired}/>
                        <Conditions conditions={c.conditions} renderer={this} name={c.name} data={data} id={id2} isRequired={c.isRequired}/>
                    </div>
                )
                break;
            case 'declaration':
                var value = null;
                if(data !== null && data !== undefined) {
                  value = ( data[c.name] )? data[c.name] : null ;
                }
                _elements.push(
                    <div class="form-group">
                        <label>{c.label}</label>
                        <Checkbox name={c.name} label={c.label} value={val} help_text={c.help_text} handleChange={this.handleCheckBoxChange} conditions={c.conditions} />
                        <Conditions conditions={c.conditions} renderer={this} name={c.name} data={value}/>
                    </div>
                )
                break;
            case 'file':
                _elements.push(
					<File name={c.name} label={c.label} value={val} id={id} comment_value={comment_val} isRepeatable={c.isRepeatable} handleChange={this.handleFileChange} readonly={readonly} help_text={help_text} help_text_assessor={help_text_assessor} assessorMode={assessorMode} docsUrl={this.status_data.docs_url} readonly={readonly} assessor_readonly={assessor_visibility} application_id={applicationId} isRequired={c.isRequired} help_text_url={help_text_url} help_text_assessor_url={help_text_assessor_url}/>
                )
                break;
            case 'date':
                _elements.push(
					<DateField name={c.name} label={c.label} value={val} id={id} comment_value={comment_val}  handleChange={this.handleFileChange} readonly={readonly} help_text={help_text} help_text_assessor={help_text_assessor} assessorMode={assessorMode} assessor_readonly={assessor_visibility} isRequired={c.isRequired} help_text_url={help_text_url} help_text_assessor_url={help_text_assessor_url}/>
                )
                break;
            default:
            return "";
        }
        if (assessorMode && $.inArray(c.type,['declaration','group','section','label']) == -1 && c.canBeEditedByAssessor){
            var boxes = this.generateAssessorTextBoxes(h,c,val,assessorLevel,assessorData,assessorInfo);
            // Merge assessor boxes to _elements array
            Array.prototype.push.apply(_elements,boxes);
        }
        console.log(_elements);
        return _elements;
    },
    handleRadioChange(e){
        var conditions = $(e.target).data('conditions');
        if (conditions && conditions !== undefined) {
            var cons = Object.keys(conditions);
            var btns = $('input[name='+e.target.name+']');
            $.each(btns,function (i,input) {
                $("#cons_"+e.target.name+'_'+input.value).addClass('hidden');
            });
            $("#cons_"+e.target.name+'_'+e.target.value).removeClass('hidden');
        }
    },
    handleCheckBoxChange(e){
        var conditions = $(e.target).data('conditions');
        if (conditions && conditions !== undefined) {
            var cons = Object.keys(conditions);
            var btns = $('input[name='+e.target.name+']');
            $.each(btns,function (i,input) {
                $("#cons_"+e.target.name+'_'+input.value).addClass('hidden');
            });
            $("#cons_"+e.target.name+'_'+e.target.value).removeClass('hidden');
        }

    },
    handleDeclaration(e){
        return true;
    },
    selectionChanged(target){
        var conditions = $(target).data('conditions');

        if (conditions) {
            var cons = Object.keys(conditions);
            for (var i = 0; i < cons.length; i++) {
                if (cons[i] == target.value) {
                    $("#cons_"+target.name+'_'+target.value).removeClass('hidden');
                }else{
                    $("#cons_"+target.name+'_'+cons[i]).addClass('hidden');
                }
            }
        }
    },
    getSections(){
        return this.sections;
    },
    sections:[],
    tabs_list:[],
    getTabslist(){
        return this.tabs_list;
    },
    generateAssessorTextBoxes(h,c,val,assessor_mode,assessor_data,assessor_info){
        var boxes = [];

        if (!this.status_data.can_user_edit){
            if (assessor_data){
                var _dt = assessor_data.find(at => at.name == c.name)
                // Assessor Data
                var assessor_name = `${c.name}-Assessor`;
                var assessor_val = _dt == undefined || _dt.assessor == '' ? val : _dt.assessor;
                var assessor_visibility = assessor_mode == 'assessor' && this.status_data.assessorStatus.has_assessor_mode? true : false;
                assessor_visibility = !assessor_visibility;
                boxes.push(
                    <AssessorText type="text" name={assessor_name} value={assessor_val} label={'Assessor'} help_text={c.help_text} readonly={assessor_visibility}/>
                )
                // Referral Data
                var current_referral_present = false;
                if (_dt != undefined){
                    $.each(_dt.referrals,(i,v)=> {
                        if (v.email == assessor_info.email){ current_referral_present = true; }
                        var readonly = v.email == assessor_info.email && assessor_mode == 'referral' && this.status_data.assessorStatus.assessor_can_assess ? false : true;
                        var referral_name = `${c.name}-Referral-${v.email}`;
                        boxes.push(
                            <AssessorText type="text" name={referral_name} value={v.value} label={v.full_name} help_text={c.help_text} readonly={readonly}/>
                        )
                    });
                }
                if (assessor_mode == 'referral'){
                    if (!current_referral_present){
                        // Add Referral Box 
                        var referral_name = `${c.name}-Referral-${assessor_info.email}`;
                        var referral_visibility =  assessor_mode == 'referral' && this.status_data.assessorStatus.assessor_can_assess ? false : true ;
                        var referral_label = `${assessor_info.name}`;
                        boxes.push(
                            <AssessorText type="text" name={referral_name} value={assessor_val} label={referral_label} readonly={referral_visibility}/>
                        )
                    }
                }
            }
            else{
                if (assessor_mode == 'assessor'){
                    var name = `${c.name}-Assessor`;
                    var assessor_visibility = assessor_mode == 'assessor' && this.status_data.assessorStatus.has_assessor_mode? true : false;
                    assessor_visibility = !assessor_visibility;
                    boxes.push(
                        <AssessorText type="text" name={name} value={val} label={'Assessor'} help_text={c.help_text} readonly={assessor_visibility}/>
                    )
                }
                else if (assessor_mode == 'referral'){
                    // Add Assessor Box
                    var name = `${c.name}-Assessor`;
                    var assessor_visibility = assessor_mode != 'assessor' ? true : false;
                    boxes.push(
                        <AssessorText type="text" name={name} value={val} label={'Assessor'} help_text={c.help_text} readonly={assessor_visibility}/>
                    )
                    // Add Referral Box
                    var referral_name = `${c.name}-Referral-${assessor_info.email}`;
                    var referral_visibility = assessor_mode != 'referral' ? true : false;
                    var referral_label = `${assessor_info.name}`;
                    boxes.push(
                        <AssessorText type="text" name={referral_name} value={val} label={referral_label} readonly={referral_visibility}/>
                    )
                }
            }
        }
        if (boxes.length > 0){
            boxes = [<div class="row"> {boxes} </div>]
        }
        return boxes;
    },
    status_data : {},
    store_status_data(readonly,assessorData,commentData,assessorEmail,assessorMode,can_user_edit,docs_url, applicationId){
        this.status_data = {
            'readonly': readonly,
            'assessorData': assessorData,
            'commentData': commentData,
            'assessorInfo': assessorEmail,
            'assessorStatus': assessorMode,
            'can_user_edit': can_user_edit,
            'docs_url': docs_url,
			'applicationId': applicationId,
        }
    },
    getVisibility(h,c,readonly,assessor_mode,assessor_can_assess){
        var _status = {
            'visible':true,
            'editable':true
        }
        if (assessor_mode){
            if (c.isVisibleForAssessorOnly){
                if (this.status_data.can_user_edit){
                    _status.visible = false;
                }
                if (!assessor_can_assess){ _status.editable = false }
                return _status;
            }
            else {
                _status.editable = readonly ? false : true;
            }
        }
        else{
            if (c.isVisibleForAssessorOnly){
                _status.visible = false;
                _status.editable = false;
            }
            else{
                _status.editable = readonly ? false : true;
            }
        }
        return _status;
    }
}
