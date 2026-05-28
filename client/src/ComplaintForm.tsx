import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  ShieldCheck,
  AlertCircle,
  CheckCircle2,
  Globe,
  Paperclip,
  Info,
  FileText,
  User,
} from "lucide-react";
import { t, type Language } from "./lib/translations";
import { supabase } from "./lib/supabase";

export default function ComplaintForm() {
  const { slug } = useParams<{ slug: string }>();
  const [lang, setLang] = useState<Language>("hu");
  const [company, setCompany] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Base Fields
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(true);
  const [reporterEmail, setReporterEmail] = useState("");

  // Premium Fields
  const [category, setCategory] = useState("");
  const [relation, setRelation] = useState("");
  const [incidentDate, setIncidentDate] = useState("");
  const [involvedParties, setInvolvedParties] = useState("");
  const [isGoodFaith, setIsGoodFaith] = useState(false);

  // File
  const [file, setFile] = useState<File | null>(null);
  const [uploadingText, setUploadingText] = useState("");

  useEffect(() => {
    async function fetchCompany() {
      const { data } = await supabase
        .from("companies")
        .select("id, name, is_active, primary_color, logo_url")
        .eq("slug", slug)
        .single();
      setCompany(data);
      setLoading(false);
    }
    fetchCompany();
  }, [slug]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!company || !isGoodFaith) return;
    setSubmitting(true);
    setUploadingText(dict.submittingBtn);

    let filePath = null;

    if (file) {
      setUploadingText("Fájl titkosítása és feltöltése...");
      const fileExt = file.name.split(".").pop();
      const fileName = `${crypto.randomUUID()}.${fileExt}`;

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("evidence")
        .upload(`complaints/${fileName}`, file, {
          cacheControl: "3600",
          upsert: false,
        });

      if (!uploadError && uploadData) {
        filePath = uploadData.path;
      } else {
        console.error("File upload failed:", uploadError);
      }
    }

    setUploadingText(dict.submittingBtn);
    const { error } = await supabase.from("complaints").insert([
      {
        company_id: company.id,
        subject,
        content,
        category,
        relation_to_company: relation,
        incident_date: incidentDate || null,
        involved_parties: involvedParties,
        good_faith_declaration: isGoodFaith,
        is_anonymous: isAnonymous,
        reporter_email: isAnonymous ? null : reporterEmail,
        attached_file_path: filePath,
      },
    ]);

    setSubmitting(false);
    if (!error) setSubmitted(true);
  };

  const dict = t[lang];

  if (loading)
    return (
      <div className="flex h-screen items-center justify-center bg-slate-50 text-sm font-medium text-slate-500">
        <div className="flex flex-col items-center gap-3">
          <div className="w-6 h-6 border-2 border-slate-300 border-t-slate-800 rounded-full animate-spin"></div>
          Rendszer ellenőrzése...
        </div>
      </div>
    );

  if (!company || !company.is_active) {
    return (
      <div className="min-h-screen bg-slate-50 px-4 py-24 transition-colors">
        <div className="mx-auto max-w-md p-8 bg-white border border-slate-100 rounded-2xl text-center shadow-xl shadow-slate-200/50">
          <div className="w-16 h-16 bg-rose-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="h-8 w-8 text-rose-500" />
          </div>
          <h1 className="text-xl font-bold text-slate-900 mb-2">
            {dict.suspendedTitle}
          </h1>
          <p className="text-sm text-slate-500">
            A rendszer átmenetileg nem fogad bejelentéseket ehhez a
            szervezethez.
          </p>
        </div>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-slate-50 px-4 py-24 transition-colors">
        <div className="mx-auto max-w-lg p-10 bg-white border border-slate-100 rounded-2xl text-center shadow-xl shadow-slate-200/50">
          <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="h-10 w-10 text-emerald-500" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mb-3">
            {dict.successTitle}
          </h1>
          <p className="text-slate-500 leading-relaxed">{dict.successText}</p>
        </div>
      </div>
    );
  }

  const inputClass =
    "w-full rounded-xl border border-slate-200 px-4 py-3 text-sm bg-slate-50/50 text-slate-900 hover:bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200";

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 transition-colors">
      <div className="mx-auto max-w-3xl">
        <div className="mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div>
            {company.logo_url ? (
              <img
                src={company.logo_url}
                alt={company.name}
                className="h-16 object-contain mb-4"
              />
            ) : (
              <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-2">
                {company.name}
              </h1>
            )}
            <p className="text-base text-slate-500 font-medium">
              {dict.subtitle}
            </p>
          </div>

          <div className="flex items-center gap-2 bg-white px-4 py-2.5 rounded-xl border border-slate-200 shadow-sm transition-shadow hover:shadow-md">
            <Globe className="w-4 h-4 text-slate-400" />
            <select
              value={lang}
              onChange={(e) => setLang(e.target.value as Language)}
              className="text-sm font-medium bg-transparent border-none text-slate-700 focus:outline-none cursor-pointer"
            >
              <option value="hu">Magyar</option>
              <option value="en">English</option>
              <option value="de">Deutsch</option>
            </select>
          </div>
        </div>

        <div
          className="mb-8 flex items-center gap-3 rounded-xl px-5 py-4 text-sm font-medium text-white shadow-lg"
          style={{ backgroundColor: company.primary_color }}
        >
          <ShieldCheck className="h-6 w-6 shrink-0 text-white/90" />
          <span className="leading-relaxed">{dict.secureNotice}</span>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white border border-slate-100 rounded-2xl shadow-xl shadow-slate-200/40 relative overflow-hidden transition-colors"
        >
          <div
            className="absolute top-0 left-0 w-full h-1.5"
            style={{ backgroundColor: company.primary_color }}
          />

          <div className="p-8 sm:p-10 space-y-12">
            <section>
              <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2 mb-6">
                <Info className="w-5 h-5 text-slate-400" />
                {dict.sec1Title}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    {dict.categoryLabel}
                  </label>
                  <select
                    required
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className={inputClass}
                    style={{ focusRingColor: company.primary_color } as any}
                  >
                    <option value="" disabled>
                      {dict.selectDefault}
                    </option>
                    {dict.categories.map((cat, idx) => (
                      <option key={idx} value={cat.value}>
                        {cat.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    {dict.incidentDateLabel}
                  </label>
                  <input
                    type="date"
                    value={incidentDate}
                    onChange={(e) => setIncidentDate(e.target.value)}
                    className={inputClass}
                  />
                </div>
              </div>
            </section>

            <hr className="border-slate-100" />

            <section>
              <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2 mb-6">
                <FileText className="w-5 h-5 text-slate-400" />
                {dict.sec2Title}
              </h3>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    {dict.involvedPartiesLabel}
                  </label>
                  <input
                    type="text"
                    placeholder={dict.involvedPartiesPlaceholder}
                    value={involvedParties}
                    onChange={(e) => setInvolvedParties(e.target.value)}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    {dict.subjectLabel}
                  </label>
                  <input
                    type="text"
                    required
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    {dict.contentLabel}
                  </label>
                  <textarea
                    required
                    rows={6}
                    placeholder={dict.contentPlaceholder}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className={`${inputClass} resize-y min-h-[120px]`}
                  />
                </div>
              </div>
            </section>

            <hr className="border-slate-100" />

            <section>
              <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2 mb-6">
                <Paperclip className="w-5 h-5 text-slate-400" />
                {dict.attachmentLabel}
              </h3>
              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-slate-200 border-dashed rounded-xl cursor-pointer bg-slate-50/50 hover:bg-slate-100 transition-all duration-200 group">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm mb-3 group-hover:scale-105 transition-transform">
                      <Paperclip className="w-6 h-6 text-slate-400 group-hover:text-slate-600" />
                    </div>
                    <p className="mb-2 text-sm text-slate-600">
                      <span className="font-semibold text-slate-900">
                        Kattintson a feltöltéshez
                      </span>{" "}
                      vagy húzza ide a fájlt
                    </p>
                    <p className="text-xs text-slate-500">
                      {dict.attachmentHelper}
                    </p>

                    {file && (
                      <div className="mt-4 px-4 py-2 bg-emerald-50 border border-emerald-100 rounded-full flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                        <span className="text-sm font-medium text-emerald-700 truncate max-w-[200px]">
                          {file.name}
                        </span>
                      </div>
                    )}
                  </div>
                  <input
                    type="file"
                    className="hidden"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        if (e.target.files[0].size > 5 * 1024 * 1024)
                          return alert(
                            "A fájl mérete nem haladhatja meg az 5MB-ot.",
                          );
                        setFile(e.target.files[0]);
                      }
                    }}
                  />
                </label>
              </div>
            </section>

            <hr className="border-slate-100" />

            <section>
              <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2 mb-6">
                <User className="w-5 h-5 text-slate-400" />
                {dict.sec3Title}
              </h3>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    {dict.relationLabel}
                  </label>
                  <select
                    required
                    value={relation}
                    onChange={(e) => setRelation(e.target.value)}
                    className={`${inputClass} md:w-1/2`}
                  >
                    <option value="" disabled>
                      {dict.selectDefault}
                    </option>
                    {dict.relations.map((rel, idx) => (
                      <option key={idx} value={rel.value}>
                        {rel.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="bg-slate-50 p-6 rounded-xl border border-slate-100 space-y-4">
                  <label className="flex items-start gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={isAnonymous}
                      onChange={(e) => setIsAnonymous(e.target.checked)}
                      className="mt-1 w-4 h-4 rounded border-slate-300 text-slate-900 focus:ring-slate-900 cursor-pointer"
                    />
                    <span className="text-sm text-slate-700 leading-relaxed group-hover:text-slate-900 transition-colors">
                      <strong className="block mb-0.5">
                        {dict.anonCheckbox}
                      </strong>
                      <span className="text-slate-500">{dict.anonNotice}</span>
                    </span>
                  </label>

                  {!isAnonymous && (
                    <div className="pt-4 mt-4 border-t border-slate-200/60 pl-7 animate-in fade-in slide-in-from-top-2 duration-300">
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        {dict.emailLabel}
                      </label>
                      <input
                        type="email"
                        required={!isAnonymous}
                        value={reporterEmail}
                        onChange={(e) => setReporterEmail(e.target.value)}
                        className={`${inputClass} md:w-2/3 bg-white`}
                      />
                    </div>
                  )}
                </div>

                <label className="flex items-start gap-4 cursor-pointer p-6 bg-emerald-50/50 border border-emerald-100/80 rounded-xl hover:bg-emerald-50 transition-colors group">
                  <input
                    type="checkbox"
                    required
                    checked={isGoodFaith}
                    onChange={(e) => setIsGoodFaith(e.target.checked)}
                    className="mt-1 w-4 h-4 rounded border-emerald-400 text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                  />
                  <span className="text-sm text-emerald-900 leading-relaxed">
                    <strong className="block mb-1 text-base">
                      {dict.goodFaithTitle}
                    </strong>
                    <span className="text-emerald-700/90">
                      {dict.goodFaithText}
                    </span>
                  </span>
                </label>
              </div>
            </section>
          </div>

          <div className="px-8 py-6 sm:px-10 bg-slate-50 border-t border-slate-100">
            <button
              type="submit"
              disabled={submitting || !isGoodFaith}
              style={{
                backgroundColor:
                  submitting || !isGoodFaith
                    ? "#94a3b8"
                    : company.primary_color,
              }}
              className="w-full flex justify-center items-center rounded-xl py-4 text-base font-bold text-white transition-all hover:opacity-90 hover:shadow-lg disabled:hover:shadow-none disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
            >
              {submitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-3"></div>
                  {uploadingText}
                </>
              ) : (
                dict.submitBtn
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
