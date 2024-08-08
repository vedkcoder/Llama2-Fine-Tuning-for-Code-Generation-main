import torch
from peft import AutoPeftModelForCausalLM
from transformers import AutoTokenizer
from huggingface_hub import login

login('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')
# print(torch.cuda.is_available())

def load_model():
    peft_model_dir = "peft-language-code"

    trained_model = AutoPeftModelForCausalLM.from_pretrained(
        peft_model_dir,
        low_cpu_mem_usage=True,
        torch_dtype=torch.float16,
        load_in_4bit=True,
    )
    tokenizer = AutoTokenizer.from_pretrained(peft_model_dir, token='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')

    return trained_model, tokenizer

def get_llama_output_lang(input_text, language):

    model, tokenizer = load_model()

    prompt = f"""
    Below is an instruction. Give a code that appropriately completes the request in the langauge:{language}

    ### Input:
    {input_text}

    ### Code:
    """

    input_ids = tokenizer(prompt, return_tensors='pt',truncation=True).input_ids.cuda()
    outputs = model.generate(input_ids=input_ids, max_new_tokens=100, )
    output= tokenizer.batch_decode(outputs.detach().cpu().numpy(), skip_special_tokens=True)[0][len(prompt):]

    return output


def get_llama_output_nolang(input_text):

    model, tokenizer = load_model()

    prompt = f"""
    Below is an instruction. Give a code that appropriately completes the request.

    ### Input:
    {input_text}

    ### Code:
    """

    input_ids = tokenizer(prompt, return_tensors='pt',truncation=True).input_ids.cuda()
    outputs = model.generate(input_ids=input_ids, max_new_tokens=100, )
    output= tokenizer.batch_decode(outputs.detach().cpu().numpy(), skip_special_tokens=True)[0][len(prompt):]

    return output

# model, tok = load_model()
