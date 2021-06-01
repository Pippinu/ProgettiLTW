let arrayCars = {};

$(document).ready(function(){
    //$('#dinamicDiv').load('../html/offerte.html');
    //Input che fanno uso dell'API Datepicker
    $('#dateStart').datepicker();
    $('#dateEnd').datepicker();
    $('#inputNascita').datepicker();

    //Implementazione dei Btn degli input con datepicker
    $('#calendarIconStart').click(function(){
        $('#dateStart').focus();
    });
    $('#calendarIconEnd').click(function(){
        $("#dateEnd").focus();
    });

    $('#signUpNascitaBtn').click(function(){
        $('#inputNascita').focus();
    })
    //Campo pass SignUP
    $('#showHideBtnSignUp').click(function(event) {
        if($('#inputPassSignUpModal').val().length > 1){
            event.preventDefault();
            $('#showPassIconSignUp').toggle();
            $('#hidePassIconSignUp').toggle();

            hideShowPass($('#inputPassSignUpModal'));
        }
    });
    //Campo conferma pass SignUP
    $('#showHideConfirmBtnSignUp').click(function(event) {
        if($('#inputConfirmPassSignUpModal').val().length > 1){
            event.preventDefault();
            $('#showConfirmPassIconSignUp').toggle();
            $('#hideConfirmPassIconSignUp').toggle();

            hideShowPass($('#inputConfirmPassSignUpModal'));
        }
    });
    $('#showHideBtnSignIn').click(function(event) {
        if($('#inputPassSignIn').val().length > 1){
            event.preventDefault();
            $('#showPassIconSignIn').toggle();
            $('#hidePassIconSignIn').toggle();

            hideShowPass($('#inputPassSignIn'));
        }
    });

    //Seleziono le 3 card del div ajaxCardsDiv che le contiene
    var ajaxCards = $('#ajaxCardsDiv div');
    ajaxCards.each(function(){
        $(this).click(function(){
            if(!$(this).hasClass('activeCard')){
                //Rimuovo a tutti la classe activeCard cosi da non avere conflitti
                ajaxCards.each(function(){
                    if($(this).hasClass('activeCard')){
                        $(this).addClass('normalCard');
                        $(this).removeClass('activeCard');

                        if($(this).children('span').hasClass('fs-2')){
                            $(this).children('span').removeClass('fs-2');
                            $(this).children('span').addClass('fs-4');
                        }
                    } 
                })
                $(this).removeClass('normalCard');
                $(this).addClass('activeCard');

                if($(this).children('span').hasClass('fs-4')){
                    $(this).children('span').removeClass('fs-4');
                    $(this).children('span').addClass('fs-2');
                }

                $('#dinamicDiv').load('../html/' + $(this).attr('id') + '.html');
            } else {
                ajaxCards.each(function(){
                    if($(this).hasClass('activeCard')){
                        $(this).addClass('normalCard');
                        $(this).removeClass('activeCard');

                        if($(this).children('span').hasClass('fs-2')){
                            $(this).children('span').removeClass('fs-2');
                            $(this).children('span').addClass('fs-4');
                        }
                    } 
                })
                $('#dinamicDiv').html('');
            }

        })
    })

    $('#btnFiltraOrdina').click(function(){
        if($(this).hasClass('rounded-top')){
            $(this).removeClass('rounded-top');
            $(this).removeClass('rounded-0');
            $(this).addClass('rounded-1');
        } else if($(this).hasClass('rounded-1')){
            $(this).removeClass('rounded-1');
            $(this).addClass('rounded-0');
            $(this).addClass('rounded-top');
            
        }
        
    })

    //SignUp Validation
    //La seguente istruzione mette nell'array tutti gli elem <input> del form
    var InputToCheckSignUp = $('#SignUpForm input');
    InputToCheckSignUp.each(function(){
        if($(this).attr('id') !== 'inputConfirmPassSignUpModal'){
            $(this).change(function(){
                console.log($(this).val() + ' ' + $(this).attr('id'));
                if($(this).val().length > 0){
                    if($(this).hasClass('is-invalid')){
                        $(this).removeClass('is-invalid');
                    }
                    $(this).addClass('is-valid');
                } else {
                    if($(this).hasClass('is-valid')){
                        $(this).removeClass('is-valid');
                    }
                    $(this).addClass('is-invalid');
                }
            })
        } else {
            //Check Pass e Conferma Pass
            $(this).change(function(){
                if($(this).val() === $('#inputPassSignUpModal').val()){
                    if($(this).hasClass('is-invalid')){
                        $(this).removeClass('is-invalid');
                    } 
                    $(this).addClass('is-valid');
                } else {
                    if($(this).hasClass('is-valid')){
                        $(this).removeClass('is-valid');
                    }
                    $(this).addClass('is-invalid');
                }
            })
        }
    })

    //SignIn Validation
    //La seguente istruzione mette nell'array tutti gli elem <input> del form
    var InputToCheckSignIn = $('#signInForm input');
    InputToCheckSignIn.each(function(){
        $(this).change(function(){
            if($(this).val().length > 0){
                if($(this).hasClass('is-invalid')){
                    $(this).removeClass('is-invalid');
                }
                $(this).addClass('is-valid');
            } else {
                if($(this).hasClass('is-valid')){
                    $(this).removeClass('is-valid');
                }
                $(this).addClass('is-invalid');
            }
        })
    })

    //Form Noleggio Validation
    var InputToCheckNoleggio = $('#noleggioForm input');
    InputToCheckNoleggio.each(function(){
        var check = true;
        $(this).change(function(){
            if($(this).attr('id') == 'dateEnd' || $(this).attr('id') == 'dateStart'){

                //Controllo che nessuno delle 2 date sia vuoto e che dateEnd sia sempre maggiore di dateStart
                check = checkDate($('#dateEnd'), $('#dateStart'));

            } else if($(this).val().length > 0){
                if($(this).hasClass('is-invalid')){
                    $(this).removeClass('is-invalid');
                }
                $(this).addClass('is-valid');
                check = true;
            } else {
                if($(this).hasClass('is-valid')){
                    $(this).removeClass('is-valid');
                }
                $(this).addClass('is-invalid');
                check = false;
            }
            invalidButton('#noleggioSubmitBtn', InputToCheckNoleggio, true);
        })
    })

    var InputToCheckCreditCard = $('#creditCardForm input');
    InputToCheckCreditCard.each(function(){
        $(this).change(function(){
            if($(this).attr('id') == 'inputName'){

                if($(this).val().length > 4){
                    if($(this).hasClass('is-invalid')) $(this).removeClass('is-invalid');
                    $(this).addClass('is-valid');
                } else {
                    if($(this).hasClass('is-valid')) $(this).removeClass('is-valid');
                    $(this).addClass('is-invalid');
                }
            } else if($(this).attr('id') == 'inputNumber'){

                if($(this).val().length == 19){
                    if($(this).hasClass('is-invalid')) $(this).removeClass('is-invalid');
                    $(this).addClass('is-valid');
                } else {
                    if($(this).hasClass('is-valid')) $(this).removeClass('is-valid');
                    $(this).addClass('is-invalid');
                }
            } else if($(this).attr('id') == 'inputExpiry'){

                if($(this).val().length == 7 || $(this).val().length == 9){
                    if($(this).hasClass('is-invalid')) $(this).removeClass('is-invalid');
                    $(this).addClass('is-valid');
                } else {
                    if($(this).hasClass('is-valid')) $(this).removeClass('is-valid');
                    $(this).addClass('is-invalid');
                }
            } else if($(this).attr('id') == 'inputCVC'){

                if($(this).val().length > 2){
                    if($(this).hasClass('is-invalid')) $(this).removeClass('is-invalid');
                    $(this).addClass('is-valid');
                } else {
                    if($(this).hasClass('is-valid')) $(this).removeClass('is-valid');
                    $(this).addClass('is-invalid');
                }
            }

            invalidButton('#pagaBtn', InputToCheckCreditCard, true);
        })
    })

    $('#rowCard .btn').click(function(){
        var values = JSON.parse($(this).attr('data-autovalue'));
        //Salvo l'oggetto macchina corrente nel array global arrayCars cosi da usarlo in caso di ordine
        if(arrayCars[values['marchio'] + values['nome']] == null){
            arrayCars[values['marchio']+values['nome']] = values;
        }

        console.log($(this).attr('data-autovalue'));

        $('#imgOrdine').attr('src', '../img/imgAuto/' + values['img']);
        $('#pCilindrataOrdine').html('<b>Cilindrata:</b> ' + values['cilindrata'] + 'cc');
        $('#pPostiOrdine').html('<b>Posti:</b> ' + values['posti']);
        $('#pCambioOrdine').html('<b>Cambio:</b> ' + values['cambio']);

        $('#ConfermaPagaBtn').attr('data-autoMarchio', values['marchio']);
        $('#ConfermaPagaBtn').attr('data-autoNome', values['nome']);
    })

    $('#ConfermaPagaBtn').click(function(){
        $('#autoOrdinaModal').modal('hide');
        $('#creditCardModal').modal('show');
        $('#pagaBtn').attr('data-autoMarchio', $(this).attr('data-autoMarchio'));
        $('#pagaBtn').attr('data-autoNome', $(this).attr('data-autoNome'));
    })

    $('#pagaBtn').click(function(){
        $marchio = $(this).attr('data-autoMarchio');
        $nome = $(this).attr('data-autoNome');

        $.ajax({
            type: 'POST',
            url: '..\\php\\validateOrder.php',
            data: { marchioNome : $marchio + $nome },
            success: function() {
                console.log('OK');
            },
            error: function() {
                console.log('NO');
            }
        });
        
        $(this).prop('disabled', true);
        $(this).html('Attendi...')

        setTimeout(function(){
            window.location.replace('../php/index.php');
        }, 2000);
    });

    //Script per far coincidere il font-size del titolo delle card con la grandezza del div 'card-title' nella pagina 'rentCatalogPage.php'
    // $fontSize = 30;
    // $titleCards = $('.divTitle');
    // $titleCards.each(function(){
    //     $thisChildSpan = $(this).children('.card-title');
    //     $thisChildSpan.css('font-size', $fontSize);
        
    //     while($thisChildSpan.width() > $(this).width()){
    //         $fontSize -= .5;
    //         $thisChildSpan.css('font-size', $fontSize);
    //     }

    //     while($thisChildSpan.width() < $(this).width()){
    //         $fontSize += .5;
    //         $thisChildSpan.css('font-size', $fontSize);
    //     }
    // })
})

let hideShowPass = el => {
    if (el.attr("type") == "password") {
        el.attr("type", "text");
    } else {
        el.attr("type", "password");
    }
}
let dateInput = el =>{

    btn = $(el).children('btn');

    el.datepicker();
    $(btn).click(function(){
        $(el).focus();
    })
}
//Controllo che tutti i campi del form SignIn siano validi
let checkSubmitSignIn = () => {
    var InputToCheckSignIn = $('#SignInForm input');
    var check = true;

    InputToCheckSignIn.each(function(){
        if($(this).hasClass('is-invalid') || !$(this).hasClass('is-valid')){
            check = false;
        }
    })
    return check;
}
//Controllo che tutti i campi del form SignUp siano validi
let checkSubmitSignUp = () => {
    var InputToCheckSignUp = $('#SignUpForm input');
    var check = true;

    InputToCheckSignUp.each(function(){
        if($(this).hasClass('is-invalid') || !$(this).hasClass('is-valid')){
            check = false;
        }
    })
    return check;
}
//Disabilita il Btn cerca fin quando tutti gli input (Citta, DataInizioNoleggio, DataFineNoleggio) non sono validi, cioe con length > 0
let invalidButton = (el, InputToCheck, check) => {

    InputToCheck.each(function(){
        // Debug Purpose
        // console.log($(this).attr('id') + ': ' + $(this).val().length)
        if($(this).hasClass('is-invalid') || $(this).val().length < 1){
            check = false;
        }
    })

    if($(el).is('[disabled]') && check == true){
        $(el).prop('disabled', false);
    } else if(!$(el).is('[disabled]') && check == false){
        $(el).prop('disabled', true);
    }
}

let checkDate = (divToCheck, divCompare) => {
    var dCheck = new Date(divToCheck.val());
    var dCompare = new Date(divCompare.val());

    if(!divCompare.val() || !divToCheck.val() || dCheck < dCompare){
        if(divToCheck.hasClass('is-valid')) divToCheck.removeClass('is-valid');
        divToCheck.addClass('is-invalid');

        if(divCompare.hasClass('is-valid')) divCompare.removeClass('is-valid');
        divCompare.addClass('is-invalid');
        
        check = false;
        $('#errorDateDiv').attr('hidden', false);
    } else {
        if(divToCheck.hasClass('is-invalid')) divToCheck.removeClass('is-invalid');
        divToCheck.addClass('is-valid');

        if(divCompare.hasClass('is-invalid')) divCompare.removeClass('is-invalid');
        divCompare.addClass('is-valid');

        check = true;
        $('#errorDateDiv').attr('hidden', true);
    }

    return check;
}

let checkCreditcard = () => {

}