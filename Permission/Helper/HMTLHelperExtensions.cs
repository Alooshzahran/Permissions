//using Microsoft.Web.Mvc.Internal;
//using System.Web.Mvc;
using Microsoft.AspNetCore.Html;
using Microsoft.AspNetCore.Mvc.Rendering;
using Newtonsoft.Json;
//using OpenXmlPowerTools;
using System.Linq.Expressions;
using System.Reflection;
using System.Text.Encodings.Web;
using System.Xml.Serialization;
using SelectList = Microsoft.AspNetCore.Mvc.Rendering.SelectList;

namespace Permission.Helper
{
    public static class HMTLHelperExtensions
    {
        public static string IsSelected(this IHtmlHelper html, string controller = null, string action = null, string cssClass = null)
        {

            if (String.IsNullOrEmpty(cssClass))
                cssClass = "active";

            string currentAction = (string)html.ViewContext.RouteData.Values["action"];
            string currentController = (string)html.ViewContext.RouteData.Values["controller"];

            if (String.IsNullOrEmpty(controller))
                controller = currentController;

            if (String.IsNullOrEmpty(action))
                action = currentAction;

            return controller == currentController && action == currentAction ?
                cssClass : String.Empty;
        }

        public static string PageClass(this IHtmlHelper html)
        {
            string currentAction = (string)html.ViewContext.RouteData.Values["action"];
            return currentAction;
        }

        public static bool IsGreaterThanZero(this int Value)
        {
            return Value > 0;
        }

        public static double NumberSASAMulti10(this double Value)
        {
            return Value * 10;
        }

        //public static string Adaa_DropDownListFor(this IHtmlHelper html,string optionLabel,string cssClass)
        //{ return optionLabel==null ? cssClass : String.Empty; }
        //public static IHtmlContent PageLinks
        //(this IHtmlHelper htmlHelper, PageInfo pageInfo, Func<int, string> PageUrl)
        //{
        //    StringBuilder pagingTags = new StringBuilder();
        //    //Prev Page
        //    if (pageInfo.CurrentPage > 1)
        //    {
        //        pagingTags.Append(GetTagString
        //                         ("Prev", PageUrl(pageInfo.CurrentPage - 1)));
        //    }
        //    //Page Numbers
        //    for (int i = 1; i <= pageInfo.LastPage; i++)
        //    {
        //        pagingTags.Append(GetTagString(i.ToString(), PageUrl(i)));
        //    }
        //    //Next Page
        //    if (pageInfo.CurrentPage < pageInfo.LastPage)
        //    {
        //        pagingTags.Append(GetTagString
        //                         ("Next", PageUrl(pageInfo.CurrentPage + 1)));
        //    }
        //    //paging tags
        //    return new HtmlString(pagingTags.ToString());
        //}


        //private static string GetTagString(this string innerHtml, string hrefValue)
        //{
        //    TagBuilder tag = new TagBuilder("a"); // Construct an <a> tag
        //    tag.MergeAttribute("class", "anchorstyle");
        //    tag.MergeAttribute("labale", "ssss");
        //    tag.MergeAttribute("href", hrefValue);
        //    tag.InnerHtml.Append(" " + innerHtml + "  ");
        //    using (var sw = new System.IO.StringWriter())
        //    {
        //        tag.WriteTo(sw, System.Text.Encodings.Web.HtmlEncoder.Default);
        //        return sw.ToString();
        //    }
        //}





        //public static HtmlString Dropdown(string id, SelectList SelectList, string label)
        //{
        //    var button = new TagBuilder("button")
        //    {
        //        Attributes =
        //    {
        //        {"id", id},
        //        {"type", "button"},
        //        {"data-toggle", "dropdown"}
        //    }
        //    };

        //    button.AddCssClass("btn");
        //    button.AddCssClass("btn-default");
        //    button.AddCssClass("dropdown-toggle");

        //    //button.SetInnerText(label);
        //    button.InnerHtml.Append(" " + label);
        //    button.InnerHtml.AppendHtml(BuildCaret());

        //    //button.InnerHtml += " " + BuildCaret();

        //    var wrapper = new TagBuilder("div");
        //    wrapper.AddCssClass("dropdown");

        //    wrapper.InnerHtml.AppendHtml(button);
        //    wrapper.InnerHtml.AppendHtml(BuildDropdown(id, SelectList));

        //    //wrapper.InnerHtml += button;
        //    //wrapper.InnerHtml += BuildDropdown(id, selectListItems);

        //    using (var writer = new System.IO.StringWriter())
        //    {
        //        wrapper.WriteTo(writer, HtmlEncoder.Default);
        //        string asd = writer.ToString();
        //        return new HtmlString(writer.ToString());
        //    }
        //}

        //private static TagBuilder BuildCaret()
        //{
        //    var caret = new TagBuilder("span");
        //    caret.AddCssClass("caret");

        //    return caret;
        //}

        private static TagBuilder BuildOptions(TagBuilder Parent, SelectList items, string OptionLabel)
        {
            // list<TagBuilder> options = new list<TagBuilder>();
            //var TagBuilder = new TagBuilder("");
            if (!string.IsNullOrEmpty(OptionLabel))
            {
                TagBuilder newOption = new TagBuilder("option");
                newOption.InnerHtml.SetContent(OptionLabel);
                Parent.InnerHtml.AppendHtml(newOption);
            }
            foreach (var SelectListItem in items)
            {
                TagBuilder newOption = new TagBuilder("option");
                newOption.Attributes.Add("value", SelectListItem.Value);
                if (SelectListItem.Selected)
                    newOption.Attributes.Add("selected", SelectListItem.Selected.ToString());

                newOption.InnerHtml.SetContent(SelectListItem.Text);
                Parent.InnerHtml.AppendHtml(newOption);
            }



            //TagBuilder.InnerHtml.Append(BuildListRow(options));
            return Parent;

        }





        public static IHtmlContent Adaa_DropDownListFor<TModel, TProperty>(this IHtmlHelper<TModel> html,
        Expression<Func<TModel, TProperty>> expression,
        SelectList SelectList, string UrlAdd, string UrlRefresh, RouteValueDictionary parameters = null, string optionLabel="", object htmlAttributes=null)
        {
            try
            {

                
                //MemberExpression member = expression.Body as MemberExpression;
                //PropertyInfo propInfo = member.Member as PropertyInfo;

                var TagDiv = new TagBuilder("div");
                var TagSpan = new TagBuilder("span");
               
                var TagSelect = html.DropDownListFor(expression, SelectList, optionLabel, htmlAttributes);
                if (htmlAttributes != null)
                {
                    var values = new RouteValueDictionary(htmlAttributes);
                    if (values.ContainsKey("Name"))
                        ((Microsoft.AspNetCore.Mvc.Rendering.TagBuilder)TagSelect).Attributes["Name"] = values["Name"].ToString();
                }

            

                TagDiv.AddCssClass("input-group");
                TagSpan.AddCssClass("input-group-btn");
                TagDiv.InnerHtml.AppendHtml(TagSelect);


                TagBuilder TagIRefresh = new TagBuilder("i");
                TagIRefresh.AddCssClass("fa fa-refresh ");

                TagBuilder TagARefresh = new TagBuilder("a");
                TagARefresh.Attributes.Add("onclick", "refresh(this)");
                TagARefresh.Attributes.Add("data-refresh", UrlRefresh);
                if(parameters!=null)
                TagARefresh.Attributes.Add("data-dictionary", JsonConvert.SerializeObject(parameters));
                TagARefresh.AddCssClass("btn btn-warning btn-outline  dim ");
                TagARefresh.InnerHtml.AppendHtml(TagIRefresh);
                TagSpan.InnerHtml.AppendHtml(TagARefresh);


                TagBuilder TagIAdd = new TagBuilder("i");
                TagIAdd.AddCssClass("fa fa-plus");

                TagBuilder TagAAdd = new TagBuilder("a");
                TagAAdd.Attributes.Add("href", UrlAdd);
                TagAAdd.Attributes.Add("target", "_blank");
                TagAAdd.AddCssClass("btn btn-success btn-outline dim");
                TagAAdd.InnerHtml.AppendHtml(TagIAdd);

                if (htmlAttributes.ToString().Contains("disabled"))   /// add new 06-02-2023 suhaib
                    TagSpan.MergeAttribute("style", $"display:{"none"}");

                TagSpan.InnerHtml.AppendHtml(TagAAdd);
                TagDiv.InnerHtml.AppendHtml(TagSpan);

                using (var writer = new System.IO.StringWriter())
                {
                    TagDiv.WriteTo(writer, HtmlEncoder.Default);
                    return new HtmlString(writer.ToString());
                }

            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        public static IHtmlContent Adaa_DropDownListFor<TModel, TProperty>(this IHtmlHelper<TModel> html,
     Expression<Func<TModel, TProperty>> expression,
     SelectList SelectList, string UrlAdd, string UrlRefresh, string optionLabel = "", object htmlAttributes = null)
        {
            try
            {


                //MemberExpression member = expression.Body as MemberExpression;
                //PropertyInfo propInfo = member.Member as PropertyInfo;

                var TagDiv = new TagBuilder("div");
                var TagSpan = new TagBuilder("span");

                var TagSelect = html.DropDownListFor(expression, SelectList, optionLabel, htmlAttributes);
                if (htmlAttributes != null)
                {
                    var values = new RouteValueDictionary(htmlAttributes);
                    if (values.ContainsKey("Name"))
                        ((Microsoft.AspNetCore.Mvc.Rendering.TagBuilder)TagSelect).Attributes["Name"] = values["Name"].ToString();
                }

                TagDiv.AddCssClass("input-group");
                TagSpan.AddCssClass("input-group-btn");

                TagDiv.InnerHtml.AppendHtml(TagSelect);


                TagBuilder TagIRefresh = new TagBuilder("i");
                TagIRefresh.AddCssClass("fa fa-refresh");

                TagBuilder TagARefresh = new TagBuilder("a");
                TagARefresh.Attributes.Add("onclick", "refresh(this)");
                TagARefresh.Attributes.Add("data-refresh", UrlRefresh);
                
                TagARefresh.AddCssClass("btn btn-warning btn-outline  dim ");
                TagARefresh.InnerHtml.AppendHtml(TagIRefresh);
                TagSpan.InnerHtml.AppendHtml(TagARefresh);


                TagBuilder TagIAdd = new TagBuilder("i");
                TagIAdd.AddCssClass("fa fa-plus");

                TagBuilder TagAAdd = new TagBuilder("a");
                TagAAdd.Attributes.Add("href", UrlAdd);
                TagAAdd.Attributes.Add("target", "_blank");
                TagAAdd.AddCssClass("btn btn-success btn-outline dim");
                TagAAdd.InnerHtml.AppendHtml(TagIAdd);


                TagSpan.InnerHtml.AppendHtml(TagAAdd);
                TagDiv.InnerHtml.AppendHtml(TagSpan);

                using (var writer = new System.IO.StringWriter())
                {
                    TagDiv.WriteTo(writer, HtmlEncoder.Default);
                    return new HtmlString(writer.ToString());
                }

            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        public static IHtmlContent Adaa_TextBoxFor<TModel, TProperty>(this IHtmlHelper<TModel> html,
               Expression<Func<TModel, TProperty>> expression, object htmlAttributes)
        {
            try
            {

                var values = new RouteValueDictionary(htmlAttributes);




                var TagText = html.TextBoxFor(expression, htmlAttributes);
                if (values.ContainsKey("Name"))
                    ((Microsoft.AspNetCore.Mvc.Rendering.TagBuilder)TagText).Attributes["Name"] = values["Name"].ToString();


                return TagText;

            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

        public static IHtmlContent Adaa_TextBoxFor<TModel, TProperty>(this IHtmlHelper<TModel> html,
                      Expression<Func<TModel, TProperty>> expression, string format, object htmlAttributes)
        {
            try
            {

                var values = new RouteValueDictionary(htmlAttributes);




                var TagText = html.TextBoxFor(expression, format, htmlAttributes);
                if (values.ContainsKey("Name"))
                    ((Microsoft.AspNetCore.Mvc.Rendering.TagBuilder)TagText).Attributes["Name"] = values["Name"].ToString();


                return TagText;

            }
            catch (Exception ex)
            {

                throw ex;
            }

        }




        public static IHtmlContent Adaa_HiddenFor<TModel, TResult>(this IHtmlHelper<TModel> html,
                      Expression<Func<TModel, TResult>> expression)
        {
            try
            {

                var TagHiddenFor = html.HiddenFor(expression);


                return TagHiddenFor;

            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

        public static IHtmlContent Adaa_HiddenFor<TModel, TResult>(this IHtmlHelper<TModel> html,
                    Expression<Func<TModel, TResult>> expression, object htmlAttributes)
        {
            try
            {

                var TagHiddenFor = html.HiddenFor(expression, htmlAttributes);

                if (htmlAttributes != null)
                {
                    var values = new RouteValueDictionary(htmlAttributes);
                    if (values.ContainsKey("Name"))
                        ((Microsoft.AspNetCore.Mvc.Rendering.TagBuilder)TagHiddenFor).Attributes["Name"] = values["Name"].ToString();
                }

                return TagHiddenFor;

            }
            catch (Exception ex)
            {

                throw ex;
            }

        }


        public static IHtmlContent Adaa_CheckBoxFor<TModel>(this IHtmlHelper<TModel> html,
        Expression<Func<TModel, bool>> expression)
        {
            try
            {
                var TagCheckBoxFor = html.CheckBoxFor(expression, html);

                return TagCheckBoxFor;
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        public static IHtmlContent Adaa_CheckBoxFor<TModel>(
           this IHtmlHelper<TModel> html,
           Expression<Func<TModel, bool>> expression, object htmlAttributes)
        {
            try
            {
                var values = new RouteValueDictionary(htmlAttributes);
                var TagCheckBoxFor = html.CheckBoxFor(expression, htmlAttributes);
                if (values.ContainsKey("Name"))
                    ((Microsoft.AspNetCore.Mvc.Rendering.TagBuilder)TagCheckBoxFor).Attributes["Name"] = values["Name"].ToString();

                return TagCheckBoxFor;
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }


        public static IHtmlContent Adaa_LabelFor<TModel, TResult>(this IHtmlHelper<TModel> html,
          Expression<Func<TModel, TResult>> expression)
        {
            try
            {
                var TagLabelFor = html.LabelFor(expression);


                return TagLabelFor;
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }
        public static IHtmlContent Adaa_LabelFor<TModel, TResult>(this IHtmlHelper<TModel> html,
            Expression<Func<TModel, TResult>> expression, object htmlAttributes)
        {
            try
            {
                var TagLabelFor = html.LabelFor(expression, htmlAttributes);


                return TagLabelFor;
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        public static IHtmlContent Adaa_RadioButtonFor<TModel, TResult>(
            this IHtmlHelper<TModel> html,
            Expression<Func<TModel, TResult>> expression,
            object Value)
        {
            try
            {
                var TagRadioButtonFor = html.RadioButtonFor(expression, Value);


                return TagRadioButtonFor;
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }
        public static IHtmlContent Adaa_RadioButtonFor<TModel, TResult>(
           this IHtmlHelper<TModel> html,
           Expression<Func<TModel, TResult>> expression,
           object Value, object htmlAttributes)
        {
            try
            {
                var TagRadioButtonFor = html.RadioButtonFor(expression, Value, htmlAttributes);


                return TagRadioButtonFor;
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        public static IHtmlContent Adaa_ValidationMessageFor<TModel, TResult>(
           this IHtmlHelper<TModel> html,
           Expression<Func<TModel, TResult>> expression,
           string Message, object htmlAttributes)
        {
            var TagValidationMessageFor = html.ValidationMessageFor(expression, Message, htmlAttributes);

            if (htmlAttributes != null)
            {
                var values = new RouteValueDictionary(htmlAttributes);
                if (values.ContainsKey("Name"))
                    ((Microsoft.AspNetCore.Mvc.Rendering.TagBuilder)TagValidationMessageFor).Attributes["Name"] = values["Name"].ToString();
            }

            return TagValidationMessageFor;

        }



        public static IHtmlContent Adaa_TextAreaFor<TModel, TResult>(
            this IHtmlHelper<TModel> htmlHelper,
            Expression<Func<TModel, TResult>> expression)
        {
            var TagTextAreaFor = htmlHelper.TextAreaFor(expression);


            return TagTextAreaFor;
        }

        public static IHtmlContent Adaa_TextAreaFor<TModel, TResult>(
            this IHtmlHelper<TModel> htmlHelper,
            Expression<Func<TModel, TResult>> expression,
            object htmlAttributes)
        {
            var TagTextAreaFor = htmlHelper.TextAreaFor(expression, htmlAttributes);

            if (htmlAttributes != null)
            {
                var values = new RouteValueDictionary(htmlAttributes);
                if (values.ContainsKey("Name"))
                    ((Microsoft.AspNetCore.Mvc.Rendering.TagBuilder)TagTextAreaFor).Attributes["Name"] = values["Name"].ToString();
            }

            return TagTextAreaFor;
        }

        public static IHtmlContent Adaa_TextAreaFor<TModel, TResult>(
            this IHtmlHelper<TModel> htmlHelper,
            Expression<Func<TModel, TResult>> expression
           , int rows, int columns, object htmlAttributes)
        {
            var TagTextAreaFor = htmlHelper.TextAreaFor(expression,  rows, columns, htmlAttributes);

            if (htmlAttributes != null)
            {
                var values = new RouteValueDictionary(htmlAttributes);
                if (values.ContainsKey("Name"))
                    ((Microsoft.AspNetCore.Mvc.Rendering.TagBuilder)TagTextAreaFor).Attributes["Name"] = values["Name"].ToString();
            }

            return TagTextAreaFor;
        }



        public static IHtmlContent Adaa_ListBoxFor<TModel, TResult>(
            this IHtmlHelper<TModel> htmlHelper,
            Expression<Func<TModel, TResult>> expression, MultiSelectList MultiSelectList)
        {
            var TagListBoxFor = htmlHelper.ListBoxFor(expression, MultiSelectList);


            return TagListBoxFor;
        }

        public static IHtmlContent Adaa_ListBoxFor<TModel, TProperty>(this IHtmlHelper<TModel> html,
        Expression<Func<TModel, TProperty>> expression, MultiSelectList MultiSelectList
           , string UrlAdd, string UrlRefresh, RouteValueDictionary parameters = null, string optionLabel = "", object htmlAttributes = null)
        {
            var TagListBoxFor = html.ListBoxFor(expression, MultiSelectList, htmlAttributes);



            try
            {


                //MemberExpression member = expression.Body as MemberExpression;
                //PropertyInfo propInfo = member.Member as PropertyInfo;

                var TagDiv = new TagBuilder("div");
                var TagSpan = new TagBuilder("span");

                var TagSelect = html.ListBoxFor(expression, MultiSelectList, htmlAttributes); /*ListBoxFor(expression, MultiSelectList, UrlAdd, UrlRefresh, optionLabel, htmlAttributes);*/
                if (htmlAttributes != null)
                {
                    var values = new RouteValueDictionary(htmlAttributes);
                    if (values.ContainsKey("Name"))
                        ((Microsoft.AspNetCore.Mvc.Rendering.TagBuilder)TagSelect).Attributes["Name"] = values["Name"].ToString();
                }

                TagDiv.AddCssClass("input-group");
                TagSpan.AddCssClass("input-group-btn");

                TagDiv.InnerHtml.AppendHtml(TagSelect);


                TagBuilder TagIRefresh = new TagBuilder("i");
                TagIRefresh.AddCssClass("fa fa-refresh");

                TagBuilder TagARefresh = new TagBuilder("a");
                TagARefresh.Attributes.Add("onclick", "refresh(this)");
                TagARefresh.Attributes.Add("data-refresh", UrlRefresh);
                TagARefresh.AddCssClass("btn btn-warning btn-outline  dim ");
                TagARefresh.InnerHtml.AppendHtml(TagIRefresh);
                TagSpan.InnerHtml.AppendHtml(TagARefresh);

                if (parameters != null)
                    TagARefresh.Attributes.Add("data-dictionary", JsonConvert.SerializeObject(parameters));

                TagBuilder TagIAdd = new TagBuilder("i");
                TagIAdd.AddCssClass("fa fa-plus");

                TagBuilder TagAAdd = new TagBuilder("a");
                TagAAdd.Attributes.Add("href", UrlAdd);
                TagAAdd.Attributes.Add("target", "_blank");
                TagAAdd.AddCssClass("btn btn-success btn-outline dim");
                TagAAdd.InnerHtml.AppendHtml(TagIAdd);


                TagSpan.InnerHtml.AppendHtml(TagAAdd);
                TagDiv.InnerHtml.AppendHtml(TagSpan);

                using (var writer = new System.IO.StringWriter())
                {
                    TagDiv.WriteTo(writer, HtmlEncoder.Default);
                    return new HtmlString(writer.ToString());
                }

            }
            catch (Exception ex)
            {

                throw ex;
            }



            //if (htmlAttributes != null)
            //{
            //    var values = new RouteValueDictionary(htmlAttributes);
            //    if (values.ContainsKey("Name"))
            //        ((Microsoft.AspNetCore.Mvc.Rendering.TagBuilder)TagListBoxFor).Attributes["Name"] = values["Name"].ToString();
            //}

            //return TagListBoxFor;
        }

        /*Zuhairi 20-11-2022*/
        //public static IHtmlContent Adaa_DropDownListForZuhairi<TModel, TProperty>(this IHtmlHelper<TModel> html,
        //Expression<Func<TModel, TProperty>> expression, SelectList SelectList, string UrlAdd, string UrlRefresh, string optionLabel, object htmlAttributes)
        //{
        //    try
        //    {

        //        var values = new RouteValueDictionary(htmlAttributes);
        //        MemberExpression member = expression.Body as MemberExpression;
        //        PropertyInfo propInfo = member.Member as PropertyInfo;

        //        var TagDiv = new TagBuilder("div");
        //        var TagSpan = new TagBuilder("span");

        //        var TagSelect = html.DropDownListFor(expression, SelectList, optionLabel, htmlAttributes);
        //        if (values.ContainsKey("Name"))
        //            ((Microsoft.AspNetCore.Mvc.Rendering.TagBuilder)TagSelect).Attributes["Name"] = values["Name"].ToString();
        //        TagDiv.AddCssClass("input-group");
        //        TagSpan.AddCssClass("input-group-btn");

        //        TagDiv.InnerHtml.AppendHtml(TagSelect);


        //        TagBuilder TagIRefresh = new TagBuilder("i");
        //        TagIRefresh.AddCssClass("fa fa-refresh");

        //        TagBuilder TagARefresh = new TagBuilder("a");
        //        TagARefresh.Attributes.Add("onclick", "refresh(this)");
        //        TagARefresh.Attributes.Add("data-refresh", UrlRefresh);
        //        TagARefresh.AddCssClass("btn btn-warning btn-outline  dim ");
        //        TagARefresh.InnerHtml.AppendHtml(TagIRefresh);
        //        TagSpan.InnerHtml.AppendHtml(TagARefresh);


        //        TagBuilder TagIAdd = new TagBuilder("i");
        //        TagIAdd.AddCssClass("fa fa-plus");

        //        TagBuilder TagAAdd = new TagBuilder("a");
        //        TagAAdd.Attributes.Add("href", UrlAdd);
        //        TagAAdd.Attributes.Add("target", "_blank");
        //        TagAAdd.AddCssClass("btn btn-success btn-outline dim");
        //        TagAAdd.InnerHtml.AppendHtml(TagIAdd);


        //        TagSpan.InnerHtml.AppendHtml(TagAAdd);
        //        TagDiv.InnerHtml.AppendHtml(TagSpan);

        //        using (var writer = new System.IO.StringWriter())
        //        {
        //            TagDiv.WriteTo(writer, HtmlEncoder.Default);
        //            return new HtmlString(writer.ToString());
        //        }

        //    }
        //    catch (Exception ex)
        //    {

        //        throw ex;
        //    }
        //}

        //throw ex;
        //}
    }
}



